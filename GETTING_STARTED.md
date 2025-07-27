# 🎯 Playwright Test Automation Setup

Automated UI and API tests powered by [Playwright](https://playwright.dev/) and TypeScript.

This guide helps team members set up their local environment, run tests across supported environments, and troubleshoot common issues with ease.

---

## 📥 Getting Started

Clone the repository:

- `git clone https://github.com/BSparksman/PlaywrightProject`

---

## ⚙️ Environment Setup

Make sure you have the following installed:

- Node.js (v18 or higher)

Then install dependencies:

- `npm install`
- `npx playwright install`

### 📐 ESLint Setup (Optional)

If using linting:

- `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

---

## 🌍 Environment Configuration

Supported environments:

| Environment | Base URL                              |
|-------------|----------------------------------------|
| `dev`       | https://automationexercise.com         |
| `test`      | https://test.automationexercise.com    |

Set your environment:

**Option 1: Using a `.env` file**

- `echo "TEST_ENV=dev" > .env`

**Option 2: Terminal override**

- `$env:ENV_NAME="dev"; npx playwright test`

Tests will automatically skip if the base URL is unreachable.

---

## 🧪 Running Tests

Run all tests:

- `npx playwright test`

Run in headed mode (browser UI visible):

- `npx playwright test --headed`

Run a specific test file:

- `npx playwright test tests/placeOrder/placeOrderTests.spec.ts --headed`
- `npx playwright test tests/api/createAccount.spec.ts --headed`

Switch environments on the fly:

- `$env:ENV_NAME="dev"; npx playwright test`

---

## 🛠️ Additional Notes

- Parallel test execution is supported natively by Playwright.
- Tests intelligently skip when the target environment is offline.
- TODO: Adding health checks or mock layers for isolated API testing.


---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)