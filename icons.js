// Icon Components - SVG Icons as React Components
window.Icons = {
    Send: ({ className }) => React.createElement('svg', {
        className: className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg'
    }, React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        d: 'm22 2-7 20-4-9-9-4 20-7z'
    })),

    MessageCircle: ({ className }) => React.createElement('svg', {
        className: className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg'
    }, React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    })),

    Utensils: ({ className }) => React.createElement('svg', {
        className: className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg'
    }, React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        d: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z'
    })),

    Clock: ({ className }) => React.createElement('svg', {
        className: className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        React.createElement('circle', { key: 'circle', cx: '12', cy: '12', r: '10' }),
        React.createElement('polyline', { key: 'polyline', points: '12,6 12,12 16,14' })
    ]),

    Star: ({ className }) => React.createElement('svg', {
        className: className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg'
    }, React.createElement('polygon', {
        points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26'
    }))
};

// Export icons for easy access
const { Send, MessageCircle, Utensils, Clock, Star } = window.Icons;
