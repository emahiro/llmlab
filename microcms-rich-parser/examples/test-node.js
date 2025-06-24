const { parseMicroCMSHTML, MicroCMSRichParser } = require('../dist/index.js');

// MicroCMSから返されるサンプルHTML
const sampleHTML = `<p>Twitter にかくと炎上しそうなネタでもあるので、割と時流のホットなコンテンツは最近 Bluesky に自分の意見やスタンスを書いていることが多い。</p><p>タイトルの通り WFH か RTO かという話はコロナ禍から時間が経って、欧米圏では一定の解答が出つつあり、国内でもある程度企業ごとの方針は固まってきていると思っていたけど、そういった先行してスタンスを取る企業に遅れて最近になってスタンスを変更する企業の話もまたポツポツ聞くようになってきた。</p><p>身近でもそういった話を聞いたので Bluesky にこういった一連の投稿をしてみた。</p><blockquote><p>RTO 云々はだいぶ落ち着いたと思ってたけどまだポツポツ話は聞くな。自分はもうRTOになって久しいし、出社も悪くないと思ってるし、なにより出社にこだわらない方がキャリアの選択肢広がってポジティブな側面もあるので、世間の RTOの風潮に対して思うところはないんだけど、まぁRTO かかった時に現場レベルであれこれ画策するのはまぁ無駄かなとは思う。</p></blockquote><p>[emahiro (@<a href="http://emahiro.bsky.social">emahiro.bsky.social</a>)](<a href="https://bsky.app/profile/emahiro.bsky.social/post/3l4bungcwtr2e">https://bsky.app/profile/emahiro.bsky.social/post/3l4bungcwtr2e</a>)</p><hr><p>ちょうどタイムリーに Amazon が RTO を週5にするというニュースが界隈をだいぶ賑やかにさせた。</p><p>これについてはこんなコメントをした。</p><blockquote><p>文化の維持という側面はあるにせよ、コロナ禍の雇い過ぎからのゆり戻しをまだ続けてる、というふうに見えないこともない。</p></blockquote><hr><p>話は少し逸れてしまったが、１個人として見ると WFH ほど良いものはないが、それは個人最適の話であって全体最適で見るとまた話は違ってくるのだろうと思う。</p>`;

console.log('=== MicroCMS Rich Parser テスト ===\n');

// テスト1: 基本的な使用方法
console.log('1. 基本的な使用方法（ライトモード）:');
const lightModeResult = parseMicroCMSHTML(sampleHTML);
console.log('✅ パース成功 - 文字数:', lightModeResult.length);

// テスト2: ダークモード
console.log('\n2. ダークモード:');
const darkModeResult = parseMicroCMSHTML(sampleHTML, { darkMode: true });
console.log('✅ ダークモードパース成功 - 文字数:', darkModeResult.length);

// テスト3: カスタムクラス名
console.log('\n3. カスタムクラス名:');
const parser = new MicroCMSRichParser({
	darkMode: false,
	className: 'my-custom-blog-content'
});
const customResult = parser.parse(sampleHTML);
console.log('✅ カスタムクラス名パース成功 - 文字数:', customResult.length);

// テスト4: 生成されたHTMLの確認
console.log('\n4. 生成されたHTMLの確認:');
console.log('- ライトモード CSS クラス含有:', lightModeResult.includes('microcms-rich-content'));
console.log('- ダークモード CSS クラス含有:', darkModeResult.includes('dark-mode'));
console.log('- スタイル要素含有:', lightModeResult.includes('<style>'));

// テスト5: HTMLファイル出力
const fs = require('node:fs');
const testHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCMS Rich Parser - ローカルテスト</title>
</head>
<body>
    <h1>ライトモード</h1>
    ${lightModeResult}
    
    <h1>ダークモード</h1>
    ${darkModeResult}
</body>
</html>`;

fs.writeFileSync(`${__dirname}/test-output.html`, testHTML);
console.log('\n5. HTMLファイル出力:');
console.log('✅ test-output.html を生成しました');

console.log('\n=== テスト完了 ===');
console.log('ブラウザで examples/test-output.html を開いて結果を確認してください。');