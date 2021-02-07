export const ShareButtons = () => (
  <div className="flex mt-10">
    <div className="mr-3">
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-show-count="false"
      >
        Tweet
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
    <a
      href="https://b.hatena.ne.jp/entry/"
      className="hatena-bookmark-button"
      data-hatena-bookmark-layout="basic-label-counter"
      data-hatena-bookmark-lang="ja"
      data-hatena-bookmark-height="20"
      title="このエントリーをはてなブックマークに追加"
    >
      <img
        src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
        alt="このエントリーをはてなブックマークに追加"
        width="20"
        height="20"
        style={{ border: "none" }}
      />
    </a>
    <script
      type="text/javascript"
      src="https://b.st-hatena.com/js/bookmark_button.js"
      charSet="utf-8"
      async={true}
    ></script>
  </div>
);
