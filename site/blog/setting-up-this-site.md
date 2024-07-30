<post-metadata>
  <post-title>How I Setup This Site</post-title>
  <post-date>2024-01-13</post-date>
  <post-tags>jekyll</post-tags>
</post-metadata>

### Setup Ruby and Jekyll (on Fedora)
You would think that parenthetical doesn't make a difference, more on that to come.

1. install ruby from dnf
```bash
sudo dnf install ruby ruby-devel openssl-devel redhat-rpm-config gcc-c++ @development-tools
```

2. install jekyll
```bash
sudo dnf install ruby ruby-devel openssl-devel redhat-rpm-config gcc-c++ @development-tools
gem install jekyll bundler
```

3. also had to install webrick to get `jekyll serve` to work
```bash
bundle add webrick
```
