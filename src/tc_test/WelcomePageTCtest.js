import { Selector } from 'testcafe';

fixture `WelcomePage test`
    .page('src/index.html');

test('Text typing basics', async t => {
    await t.expect(true).eql(true);
});