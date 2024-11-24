const fs = require("fs");
const { parseStringPromise, Builder } = require("xml2js");

// Caminhos para os arquivos
const junitFilePath = process.argv[2];
const sonarqubeFilePath = process.argv[3];

if (!junitFilePath || !sonarqubeFilePath) {
  process.exit(1);
}

async function convertJUnitToSonarQube() {
  try {
    const junitXml = fs.readFileSync(junitFilePath, "utf-8");

    const junitData = await parseStringPromise(junitXml);

    const testExecutions = {
      testExecutions: {
        $: { version: "1" },
        file: [],
      },
    };

    const testsuites = junitData.testsuites?.testsuite || [];
    for (const suite of testsuites) {
      const testcases = suite.testcase || [];
      for (const testcase of testcases) {
        const filePath = testcase.$.classname.replace(/\./g, "/") + ".js";
        const testCaseData = {
          $: { path: filePath },
          testCase: [
            {
              $: {
                name: testcase.$.name,
                duration: Math.round(parseFloat(testcase.$.time || 0) * 1000),
              },
              ...(testcase.failure
                ? { failure: [{ $: { message: testcase.failure[0]._ } }] }
                : {}),
            },
          ],
        };
        testExecutions.testExecutions.file.push(testCaseData);
      }
    }

    // Converta para XML no formato SonarQube
    const builder = new Builder();
    const sonarqubeXml = builder.buildObject(testExecutions);

    // Escreva no arquivo de saída
    fs.writeFileSync(sonarqubeFilePath, sonarqubeXml, "utf-8");
    console.log(`Relatório convertido com sucesso para: ${sonarqubeFilePath}`);
  } catch (error) {
    console.error("Erro ao converter relatório:", error);
    process.exit(1);
  }
}

convertJUnitToSonarQube();
