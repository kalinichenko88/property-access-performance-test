# Optimized toSnakeCase Versions

## Benchmark Results

| Version | Time (ms) | Recommendation |
|---------|-----------|----------------|
| `toSnakeCase` (main) | 194.88 | ✅ **Recommended for most cases** |
| `toSnakeCaseCached` | 21.42 | ✅ **Best for repeated strings** |
| `toSnakeCaseRegex` | 694.32 | ❌ Slow, incorrect logic |
| `toSnakeCaseUint8` | 897.78 | ❌ Too slow |

## Usage Recommendations

### 1. `toSnakeCase` (main version)
**Use for:** most cases when strings don't repeat frequently
- ✅ Fastest without caching
- ✅ Correct transformation logic
- ✅ Minimal memory usage

### 2. `toSnakeCaseCached` (with caching)
**Use for:** cases with repeated strings
- ✅ 9x faster for repeated strings
- ⚠️ Uses additional memory for cache
- ⚠️ Not suitable for unique strings

## Optimizations in Main Version

1. **Using `charCodeAt()`** instead of `toLowerCase()` - avoid creating intermediate strings
2. **Direct character code comparison** (65-90 for A-Z, 97-122 for a-z)
3. **Minimal string creation** - only when necessary
4. **Early exit** for empty strings

## Usage Examples

```typescript
import { toSnakeCase, toSnakeCaseCached } from './toSnakeCase';

// For unique strings
toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('userName'); // 'user_name'

// For repeated strings (e.g., in Proxy)
const proxy = createSmartProxy(obj);
// Inside Proxy, toSnakeCase will be used for each property
```

## Performance

- **Main version:** ~0.002ms per iteration
- **Cached version:** ~0.0002ms per iteration (for repeated strings)
- **Improvement:** up to 10x for repeated strings 