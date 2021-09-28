import React from 'react';

class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { children } = this.props;

		if (this.state.hasError) {
			return (
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						backgroundColor: '#333',
						padding: '0 1.5rem',
					}}
				>
					<div
						style={{
							zIndex: 100,
							fontSize: '1.75rem',
							color: '#fff',
						}}
					>
						Something went wrong.
					</div>
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
