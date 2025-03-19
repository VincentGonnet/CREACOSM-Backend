const { DefaultReporter } = require('@jest/reporters')

/**
 * Custom reporter for Jest, hides the console output if the test passes.
 */
class Reporter extends DefaultReporter {
	constructor() {
		super(...arguments)
	}

	printTestFileHeader(_testPath, config, result) {
		const console = result.console

		if (result.numFailingTests === 0 && !result.testExecError) {
			result.console = null
		}

		super.printTestFileHeader(...arguments)

		result.console = console
	}
}

module.exports = Reporter