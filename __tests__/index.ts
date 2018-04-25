import * as nock from 'nock';
import Lang from '../src/index';

describe('Lang', () => {
	it('should set clientId and accessToken', () => {
		const lang = new Lang({
			token: 'token1234',
		});
		expect(lang.config.token).toEqual('token1234');
	});
});

describe('Request', () => {
	const endpoint = 'analyze';
	const projectId = '123';
	const text = 'abc';
	const token = 'token';
	const params = { text, projectId };
	const lang = new Lang({ token: '123' });

	it('should return a missing token error', async () => {
		const langNoToken = new Lang({ token: '' });

		try {
			await langNoToken.analyze({});
		} catch (err) {
			expect(err).toMatchSnapshot();
		}
	});

	it('should return a missing projectId error', async () => {
		try {
			await lang.analyze({});
		} catch (err) {
			expect(err).toMatchSnapshot();
		}
	});

	it('should return a missing text error', async () => {
		try {
			await lang.analyze({ projectId });
		} catch (err) {
			expect(err).toMatchSnapshot();
		}
	});

	it('should return a status error', done => {
		nock('https://api.lang.ai')
			.post(`/v1/${endpoint}`)
			.reply(400, { message: 'error' });

		lang.analyze(params).catch(err => {
			expect(err).toMatchSnapshot();
			done();
		});
	});

	it('should return an unexpected error', done => {
		nock('https://api.lang.ai')
			.post(`/v1/${endpoint}`)
			.replyWithError('something awful happened');

		lang.analyze(params).catch(err => {
			expect(err).toMatchSnapshot();
			done();
		});
	});

	it('should return a value', done => {
		nock('https://api.lang.ai')
			.post(`/v1/${endpoint}`)
			.reply(200, {
				intents: [{ name: 'collection+await', features: [] }],
			});

		lang.analyze(params).then(data => {
			expect(data).toMatchSnapshot();
			done();
		});
	});
});
