import { css } from 'styled-components';

const colorValue = {
	grayscale: {
		50: '#FEFEFE',
		100: '#F7F7FC',
		200: '#EFF0F6',
		300: '#D9DBE9',
		400: '#BEC1D5',
		500: '#A0A3BD',
		600: '#6E7191',
		700: '#4E4B66',
		800: '#2A2A44',
		900: '#14142B',
	},
	accent: {
		blue: '#007AFF',
		navy: '#0025E6',
		red: '#FF3B30',
	},
};

const color = {
	neutral: {
		text: {
			weak: colorValue.grayscale[600],
			default: colorValue.grayscale[700],
			strong: colorValue.grayscale[900],
		},
		surface: {
			default: colorValue.grayscale[100],
			bold: colorValue.grayscale[200],
			strong: colorValue.grayscale[50],
		},
		border: {
			default: colorValue.grayscale[300],
			active: colorValue.grayscale[900],
		},
	},
	brand: {
		text: {
			weak: colorValue.accent.blue,
			default: colorValue.grayscale[50],
		},
		surface: {
			weak: colorValue.grayscale[50],
			default: colorValue.accent.blue,
		},
		border: { default: colorValue.accent.blue },
	},
	danger: {
		text: {
			default: colorValue.accent.red,
		},
		surface: { default: colorValue.accent.red },
		border: { default: colorValue.accent.red },
	},
	palette: {
		blue: colorValue.accent.blue,
		navy: colorValue.accent.navy,
		red: colorValue.accent.red,
	},
};

const typography = {
	bold: {
		32: `
            font-size: 32px;
            line-height: 48px;
            font-weight: 700;
        `,
		24: `
            font-size: 24px;
            line-height: 36px;
            font-weight: 700;
        `,
		20: `
            font-size: 20px;
            line-height: 32px;
            font-weight: 700;
        `,
		16: `
            font-size: 16px;
            line-height: 24px;
            font-weight: 700;
        `,
		12: `
            font-size: 12px;
            line-height: 16px;
            font-weight: 700;
        `,
	},
	medium: {
		32: `
            font-size: 32px;
            line-height: 48px;
            font-weight: 500;
        `,
		24: `
            font-size: 24px;
            line-height: 36px;
            font-weight: 500;
        `,
		20: `
            font-size: 20px;
            line-height: 32px;
            font-weight: 500;
        `,
		16: `
            font-size: 16px;
            line-height: 24px;
            font-weight: 500;
        `,
		12: `
            font-size: 12px;
            line-height: 16px;
            font-weight: 500;
        `,
	},
};

const radius = {
	medium: '12px',
	large: '16px',
};

const buttonStates = css`
	text-align: center;
	&:hover {
		opacity: 0.8;
	}
	&:active {
		opacity: 0.64;
	}
	&:disabled {
		opacity: 0.4;
	}
`;

const buttonSizes = {
	small: `
    border-radius: ${radius.medium};
    padding: 12px 0;
	min-width: 128px;
	height: 40px;
    ${typography.medium[12]}
  `,
	medium: `
    border-radius: ${radius.medium};
    font-size: 16px;
	// min-width: 160px;
	height: 48px;
    padding: 12px 0;
    ${typography.medium[16]}
  `,
	large: `
    border-radius: ${radius.medium};
    padding: 12px 0;
	min-width: 240px;
	height: 56px;

    
    ${typography.medium[20]}
  `,
};

const buttonStyles = {
	container: `
    background-color: ${color.brand.surface.default};
    color: ${color.brand.text.default};
    ${buttonStates}
  `,
	outline: `
    color: ${color.brand.text.weak};
    border: 1px solid ${color.brand.text.weak};
    ${buttonStates}
  `,
	ghost: `
    color: ${color.neutral.text.default};
    ${buttonStates}
  `,
};
export const theme = {
	color,
	typography,
	radius,
	buttonSizes,
	buttonStyles,
	buttonStates,
};
export default theme;
