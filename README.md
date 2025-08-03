# Property Access Performance Test

A web application for testing the performance of different approaches to accessing object properties in JavaScript. The project compares three approaches to working with objects containing fields in `snake_case` format.

## 🎯 Project Goal

Compare the performance of three different approaches to accessing object properties:

1. **Direct snake_case access** - accessing properties by their original `snake_case` keys
2. **Pre-converted camelCase** - converting all fields to `camelCase` before testing
3. **Proxy wrapper** - using JavaScript Proxy for transparent mapping of `camelCase` to `snake_case`

## 🚀 Technologies

- **Frontend**: TypeScript, Vite, Tailwind CSS
- **Testing**: Custom performance runner
- **Data Generation**: Faker.js
- **Linting**: Biome
- **Build**: Vite

## 📊 Data Structure

Each object contains 100 fields in `snake_case` format, including:
- Personal data (name, email, phone)
- Address information
- Financial data
- Medical information
- Technical data (IP, User Agent, etc.)

## 🏃‍♂️ Testing Scenarios

### Read Operations
- **Sequential Read** - sequential reading of all object fields
- **Random Read** - random reading of object fields

### Write Operations
- **Write** - writing values to object fields

## 📦 Installation and Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Generate Test Data
```bash
npm run generate-data
```

### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🧪 Usage

1. Open the application in your browser
2. Select dataset size (1,000, 5,000, or 10,000 records)
3. Choose access method (Snake Case, Camel Case, Proxy)
4. Run tests:
   - **Read Seq** - sequential reading
   - **Read Random** - random reading
   - **Write** - data writing
5. View results in the log
6. Export results to JSON or CSV

## 📁 Project Structure

```
src/
├── bin/                    # Command line utilities
│   └── generate-data.ts   # Test data generator
├── data/                   # Generated datasets
│   ├── 1_000/
│   ├── 5_000/
│   └── 10_000/
├── helpers/               # Helper functions
│   ├── createSmartProxy.ts # Proxy implementation
│   ├── convertToCamelCase.ts
│   └── ...
├── models/                # TypeScript types
├── scenarios/             # Testing scenarios
│   ├── snake/            # Direct snake_case access
│   ├── camel/            # Converted camelCase
│   └── proxy/            # Proxy wrapper
├── buttons.ts            # UI handlers
├── constants.ts          # Project constants
├── datasets.ts           # Dataset loading
├── elements.ts           # DOM elements
├── main.ts              # Entry point
└── runner.ts            # Performance runner
```

## 🔧 Configuration

### Test Settings
In `src/runner.ts` you can configure test parameters:
- `iterations` - number of test iterations
- `warmupRuns` - number of warmup runs
- `timeout` - test timeout in milliseconds

### Dataset Sizes
In `src/constants.ts` you can change test dataset sizes:
```typescript
export const DATA_COUNTS = [1_000, 5_000, 10_000] as const;
```

## 📈 Results

The application outputs detailed statistics for each test:
- Average execution time
- Minimum time
- Maximum time
- Number of iterations
- Timestamp

## 🎨 UI/UX

- Modern interface with Tailwind CSS
- Intuitive test controls
- Real-time result display
- Data export in various formats
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'fix: feature/amazing-feature - Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

## 👨‍💻 Author

**Ivan Kalinichenko** - [ivan@kalinichenko.dev](mailto:ivan@kalinichenko.dev)

---

⭐ If this project was helpful, please give it a star! 