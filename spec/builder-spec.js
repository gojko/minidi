/*global describe, it, expect, beforeEach, afterEach */
'use strict';
const ComponentBuilder = require('../src/builder'),
	path = require('path'),
	os = require('os'),
	fs = require('fs'),
	crypto = require('crypto');
describe('ComponentBuilder', () => {
	let underTest, workingDir, config, modPath;
	beforeEach(function () {
		workingDir = path.join(os.tmpdir(), crypto.randomBytes(16).toString('hex'));
		modPath = path.join(workingDir, 'mod1.js');
		config = {
			a: 'something'
		};
		fs.mkdirSync(workingDir);
		fs.writeFileSync(modPath, `
			module.exports = function (config, components) {
				this.type = 'dynamic mod';
				this.config = config;
				this.components = components;
			};
		`, 'utf8');
		underTest = new ComponentBuilder(config, {
			configured: modPath,
			misconfigured: path.join(workingDir, 'non-existing')
		});
	});
	afterEach(function () {
		try {
			fs.unlinkSync(modPath);
			fs.rmdirSync(workingDir);
		} catch (e) {
			console.error(e);
		}
	});

	it('can get a configured component as a property', () => {
		const result = underTest.configured;
		expect(result.type).toEqual('dynamic mod');
		expect(result.config).toEqual(config);
		expect(result.components).toBe(underTest);
	});
	it('blows up for a misconfigured module', () => {
		expect(() => underTest.misconfigured).toThrowError(/Cannot find module/);
	});

});
