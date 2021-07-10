# jekyll-theme-panda




## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "jekyll-theme-panda"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: jekyll-theme-panda
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install jekyll-theme-panda

## Usage

### Available layouts:

| name       | description         | filename        |
| ---------- | ------------------- | --------------- |
| default    | default layout      | default.html    |
| home       | index page layout   | home.html       |
| forarchive | archive page layout | forarchive.html |
| post       | post page layout    | post.html       |

**Available includes(html):**

| name   | description                                   | filename    |
| ------ | --------------------------------------------- | ----------- |
| footer | footer component, can be edited in _config    | footer.html |
| head   | head tag                                      | home.html   |
| header | navigator component, can be edited in _config | header.html |
| search | search bar plug-in                            | search.html |

**Available includes(md):**

| name            | description                           | path                   |
| --------------- | ------------------------------------- | ---------------------- |
| profile content | markdown content in Profile in header | _includes\about\en.md  |
| policy content  | markdown content in Policy in footer  | _includes\policy\en.md |

**Syntax colors:**

Check `_sass\syntax.scss`

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/sorphwer/jekyll-theme-panda. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

### Set up via jekyll-remote-theme

**Step1**  Install [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme)

**Step2**  Fork this [jekyll-theme-panda]( https://github.com/sorphwer/jekyll-theme-panda)

**Step3**  Set `remote_theme : <your-github-username>/jekyll-theme-panda`

### Set up via bundler 

Install

```
gem install jekyll-theme-panda
```


## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

