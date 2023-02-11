# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-panda"
  spec.version       = "0.2.5"
  spec.authors       = ["riino"]
  spec.email         = ["sorphwer@gmail.com"]

  spec.summary       = "A monochrome style jekyll theme for riinosite3"
  spec.homepage      = "https://riino.site/jekyll-theme-panda/"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.1"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1.0"
end

#compile
#gem build jekyll-theme-panda.gemspec

#push
#gem push jekyll-theme-panda-0.x.x.gem
