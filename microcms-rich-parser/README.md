# MicroCMS Rich Parser

A TypeScript library to parse MicroCMS rich editor HTML responses into modern, styled blog layouts with dark mode support.

## Features

- 🎨 Modern blog-style layout with professional typography
- 🌙 Dark mode support
- 📱 Responsive design
- 🔗 Enhanced link styling with hover effects
- 💬 Styled blockquotes with visual indicators
- ✨ Clean horizontal dividers
- 🎯 TypeScript support

## Installation

### NPM

```bash
npm install microcms-rich-parser
```

### Local Installation

```bash
# Clone or download the library
cd path/to/microcms-rich-parser
npm install
npm run build

# In your project
npm install path/to/microcms-rich-parser
```

## Usage

### Basic Usage

```typescript
import { parseMicroCMSHTML } from 'microcms-rich-parser';

const htmlContent = `
<p>Twitter にかくと炎上しそうなネタでもあるので、割と時流のホットなコンテンツは最近 Bluesky に自分の意見やスタンスを書いていることが多い。</p>
<blockquote><p>RTO 云々はだいぶ落ち着いたと思ってたけどまだポツポツ話は聞くな。</p></blockquote>
<hr>
<p>話は少し逸れてしまったが、１個人として見ると WFH ほど良いものはないが、それは個人最適の話であって全体最適で見るとまた話は違ってくるのだろうと思う。</p>
`;

const styledHTML = parseMicroCMSHTML(htmlContent);
document.getElementById('content').innerHTML = styledHTML;
```

### With Dark Mode

```typescript
import { parseMicroCMSHTML } from 'microcms-rich-parser';

const styledHTML = parseMicroCMSHTML(htmlContent, {
  darkMode: true
});
```

### Using the Class

```typescript
import { MicroCMSRichParser } from 'microcms-rich-parser';

const parser = new MicroCMSRichParser({
  darkMode: true,
  className: 'my-custom-content'
});

const styledHTML = parser.parse(htmlContent);
```

## API

### `parseMicroCMSHTML(htmlContent, options?)`

Convenience function to quickly parse HTML content.

- `htmlContent` (string): The HTML content from MicroCMS rich editor
- `options` (ParseOptions, optional): Configuration options

### `MicroCMSRichParser`

Main parser class for more control.

#### Constructor Options

```typescript
interface ParseOptions {
  darkMode?: boolean;    // Enable dark mode styling (default: false)
  className?: string;    // CSS class name for wrapper (default: 'microcms-rich-content')
}
```

#### Methods

- `parse(htmlContent: string): string` - Parse HTML and return styled HTML

## Styling

The library includes built-in CSS that provides:

- **Typography**: Clean, readable font stack with proper line height
- **Paragraphs**: Optimized spacing and font sizing
- **Blockquotes**: Styled with left border, background, and quote marks
- **Links**: Enhanced with hover effects and proper contrast
- **Horizontal Rules**: Gradient-based dividers
- **Dark Mode**: Comprehensive dark theme support
- **Responsive**: Mobile-optimized layout

### Custom Styling

You can override the default styles by targeting the generated CSS classes:

```css
.microcms-rich-content {
  /* Your custom styles */
}

.microcms-rich-content.dark-mode {
  /* Your custom dark mode styles */
}
```

## Browser Support

- Modern browsers with ES2020 support
- Node.js environments with jsdom

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode
npm run dev
```

## Publishing to NPM

### 1. Prepare for Publishing

```bash
# Build the project
npm run build

# Test the build
npm pack --dry-run
```

### 2. Set NPM Registry and Login

```bash
# Set registry to npmjs.com (if not already set)
npm config set registry https://registry.npmjs.org/

# Login to your NPM account
npm login
```

### 3. Update Package Information

Edit `package.json` to include your information:

```json
{
  "name": "microcms-rich-parser",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/microcms-rich-parser.git"
  },
  "homepage": "https://github.com/yourusername/microcms-rich-parser#readme",
  "bugs": {
    "url": "https://github.com/yourusername/microcms-rich-parser/issues"
  }
}
```

### 4. Version Management

```bash
# For patch version (1.0.1)
npm version patch

# For minor version (1.1.0)
npm version minor

# For major version (2.0.0)
npm version major
```

### 5. Publish to NPM

```bash
# Publish the package
npm publish

# For scoped packages (optional)
npm publish --access public
```

### 6. Verify Publication

```bash
# Check if package is available
npm view microcms-rich-parser

# Install and test in another project
npm install microcms-rich-parser
```

### 7. Update Package

When making updates:

```bash
# Make your changes
# Build the project
npm run build

# Update version
npm version patch  # or minor/major

# Publish update
npm publish
```

### Notes

- Ensure your package name is unique on NPM
- Add a `.npmignore` file to exclude unnecessary files
- Test your package locally before publishing
- Consider using `npm pack` to preview what will be published

## License

MIT