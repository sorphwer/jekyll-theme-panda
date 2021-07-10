# jekyll-theme-panda


## Installation

### Set up via jekyll-remote-theme

**Step 1**  Install [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme)

**Step 2**  Fork this [jekyll-theme-panda]( https://github.com/sorphwer/jekyll-theme-panda)

**Step 3**  Set `remote_theme : <your-github-username>/jekyll-theme-panda`

### Set up via bundler (Not available in GithubPage)

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

We suggest fork this repo and set it as your own **remote_theme** to modify this theme.

## About Search Tool

`jekyll-theme-panda` is currently use [jekyll-search-bar](https://github.com/sorphwer/jekyll-search-bar) hosted in riino.site in default mode. To modify this search tool, please check the corresponding github page.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

