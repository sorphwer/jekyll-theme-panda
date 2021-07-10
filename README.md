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

### Set up via bundler (not implemented yet)

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `jekyll-theme-riinosite.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

