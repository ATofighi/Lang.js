// Type definitions for Lang.js
// Project: https://github.com/ATofighi/Lang.js
declare var Lang: Lang.ILangStatic;
declare namespace Lang {
	interface ILangStatic {
		languages: any;

		error(message: string): void;

		warn(message: string): void;

		log(message: string): void;

		addResource(languages: string[] | object[], prefix?: string): void;

		clear(): void;

		has(langCode: string): boolean;

		trans(message: string, variables?: object);

		get(langCode: string, variables?: object);

		choice(langCode: string, count: number, variables: object);
	}
}