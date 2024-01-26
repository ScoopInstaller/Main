---
created: 2024-01-25T22:02:49-05:00
modified: 2024-01-25T22:03:39-05:00
---

# Alpine_3.19_Incus_Install_v0.1.sh

#!/bin/ash

# Update system packages
apk update && apk upgrade

# Install development resources and main dependencies
apk add acl-dev autoconf automake eudev-dev gettext-dev go intltool libcap-dev libtool libuv-dev linux-headers lz4-dev tcl-dev sqlite-dev lxc-dev make xz acl attr ca-certificates cgmanager dbus dnsmasq lxc libintl iproute2 iptables netcat-openbsd rsync squashfs-tools shadow-uidmap tar xz

# Install extra dependencies for running virtual machines
apk add qemu-system-x86_64 qemu-chardev-spice qemu-hw-usb-redirect qemu-hw-display-virtio-vga qemu-img qemu-ui-spice-core ovmf sgdisk util-linux-misc virtiofsd

# Set environment variables for gettext issue and build paths
export CGO_LDFLAGS="$CGO_LDFLAGS -L/usr/lib -lintl"
export CGO_CPPFLAGS="-I/usr/include"

# Clone Incus repository or extract from tarball
# For git:
git clone https://github.com/lxc/incus
cd incus
# For tarball:
# tar zxvf incus-0.1.tar.gz
# cd incus-0.1

# Building from source
make deps
# Replace these with actual output from make deps
export CGO_CFLAGS="${CGO_CFLAGS} -I$(go env GOPATH)/deps/cowsql/include/ -I$(go env GOPATH)/deps/raft/include/"
export CGO_LDFLAGS="${CGO_LDFLAGS} -L$(go env GOPATH)/deps/cowsql/.libs/ -L$(go env GOPATH)/deps/raft/.libs/"
export LD_LIBRARY_PATH="$(go env GOPATH)/deps/cowsql/.libs/:$(go env GOPATH)/deps/raft/.libs/:${LD_LIBRARY_PATH}"
export CGO_LDFLAGS_ALLOW="(-Wl,-wrap,pthread_create)|(-Wl,-z,now)"
make

# Post-build configuration
[ -f ~/.ashrc ] && CONFIG_FILE=~/.ashrc || CONFIG_FILE=~/.profile
echo 'export PATH="${PATH}:$(go env GOPATH)/bin"' >> $CONFIG_FILE
echo 'export LD_LIBRARY_PATH="$(go env GOPATH)/deps/cowsql/.libs/:$(go env GOPATH)/deps/raft/.libs/:${LD_LIBRARY_PATH}"' >> $CONFIG_FILE
. $CONFIG_FILE

# Machine setup for unprivileged containers
echo "root:1000000:1000000000" | tee -a /etc/subuid /etc/subgid

# Implement rc-init for Service Persistence
echo '#!/sbin/openrc-run

command=$(go env GOPATH)/bin/incusd
command_args="--group sudo"
command_background=true
pidfile="/run/incusd.pid"
start_stop_daemon_args="--user root"

depend() {
    need net
    after firewall
}' > /etc/init.d/incusd

chmod +x /etc/init.d/incusd
rc-update add incusd default
rc-service incusd start
