<post-metadata>
  <post-title>Linux Discovery</post-title>
  <post-date>2024-11-27</post-date>
  <post-tags>linux</post-tags>
</post-metadata>

I have a lot of respect for engineers who can navigate a Linux system without looking up commands or constantly referencing `man` pages. I am not one of those people. 

This article summarizes how I would troubleshoot or explore a Linux machine with only credentials given. If performance issues, I would start with the Performance tools below. Otherwise, for standard exploration, I would start at the top following interesting results from commands below. This is not a silver bullet for every situation, just a collection of useful tools/commands and some rough categorization of how they are used. 

### Processes
Find which processes are running, then check if there are any processes that should be running but are not. Inspect those processes, their logs, their schedules (if applicable).
1. `date` - check the time! this could save you a lot of pointless troubleshooting
1. `ps -aux` - find processes running
1. `systemctl status` - get info about all processes or a specific process from `systemd`
1. `strace -p <pid>` - inspect process as it is running
1. `crontab` - check for scheduled processes
1. `/etc` - poke around, this folder tends to hold configurations for all sorts of processes both system and application

### Logs
Check logs for the kernel as well as other system level (non-application) logs.
1. `dmesg` - check for kernel log messages, very useful for finding messages about broken hardware
1. `journalctl -xe` - find logs for systems that support `systemd` log aggregation
1. `/var/log` - poke around, this folder tends to hold logs for most applications

### Performance
See what processes are consuming resources and check if any volumes/partitions are full.
1. `uptime` - check how long the system has been up and what CPU loads have been
1. `top` - check CPU, Memory, etc, check which processes are consuming the most resources
1. `df -h` - check filesystem usage
1. `free -h` - check memory usage

### Disk
Check into disks attached to the server, as well as usage of disks/partitions/filesystems. Don't assume that because a disk is plenty big that someone didn't mangle the partitions and leave a bunch of unallocated space. Check what volumes are being mounted at boot by `fstab`.
1. `lsblk` - list block devices
1. `blkid` - get IDs of block devices
1. `cat /etc/fstab` - look at fstab to see which volumes being mounted at boot, compare to results of `mount`
1. `mount` - show mounted volumes
1. `df -h` - list filesystems and usage
1. `fdisk` - look at partitions (sector beginning and ending) on a disk to make sure there is not unused free space

### Networking
Check how many interfaces are attached and active. Check IPs and routing tables.
1. `ifconfig` or `ip a` - check interfaces and related details
1. `ip route <route>` - check route for a given IP/CIDR
1. `resolvectl status` or `cat /etc/resolv.conf` - check dns settings
1. `nslookup` or `dig` - test resolving DNS records using the default DNS server and another known working DNS server
1. `nc -v <hostname> <port>` - test connectivity to a listening TCP port
1. `ss -aln` or `netstat -aln` - check what processes are listening on which ports 
1. `tcpdump -i any -c5 -nn` - dump 5 packets from any interface and don't resolve DNS names or port numbers

### Package Managers
1. Check the following
```
apt
dnf
yum
rpm
```

### Other Tools
The above focused primarily on tools you would expect to find in a generic unmodified distribution. The following are tools I've found extremely useful, though rarely installed by default.
1. `htop` - like `top`, but better in some ways
1. `iotop` - monitor disk IO, great for finding whether disk IO is causing other issues (like high CPU)
1. `iftop` - monitor network communications
1. `ncdu` - great tool for displaying sizes of folders

Don't forget to use `man` pages!

Written in conjunction with [Adam Thiede](https://adamthiede.com/)!
