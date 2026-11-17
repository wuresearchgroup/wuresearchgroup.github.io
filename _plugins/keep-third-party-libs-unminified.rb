# jekyll-terser re-minifies every *.js that isn't named *.min.js. With `third_party_libraries.download: true`
# that includes the self-hosted copies in assets/libs/ (e.g. MathJax's tex-mml-chtml.js), which then no longer
# match their `integrity` hashes and browsers refuse to run them. Put the untouched originals back.
module Jekyll
  class KeepThirdPartyLibsUnminified < Generator
    safe true
    priority :lowest # run after TerserGenerator (priority :normal)

    def generate(site)
      libs_dir = File.join(site.source, 'assets', 'libs', '')
      site.static_files.map! do |file|
        next file unless defined?(Jekyll::Terser::JSFile) && file.is_a?(Jekyll::Terser::JSFile) && file.path.start_with?(libs_dir)

        StaticFile.new(site, site.source, File.dirname(file.path).sub(site.source, ''), File.basename(file.path))
      end
    end
  end
end
