const {
    i18n: {
        __,
    },
    components: {
        Button,
        Tooltip,
        Icon,
    },
} = wp;

const Toggler = ({ formData }) => {
    const {
        icon: {
            viewBox = '0 0 512 512',
            paths = ['M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6v0c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9v0c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'],
        } = {},
    } = formData;

    const generateStyles = ({
        position,
        style: {
            padding,
            border = {},
            borderRadius,
            width,
            height,
            left = 'initial',
            right = 'initial',
            bottom = 0,
            backgroundColor = 'transparent',
            color = 'inherit',
        } = {}
    } = {}) => {
        let style = {
            position: 'fixed',
            bottom,
            width,
            height,
            padding,
            color,
            borderRadius,
            backgroundColor,
            left: position === 'left' ? left : 'initial',
            right: position === 'right' ? left : 'initial',
            transition: 'all .3s ease-in-out',
            zIndex: 1000,
        }

        let borderStyles = {};
        const borderKeys = Object.keys(border);
        const sides = ['top', 'left', 'right', 'bottom'];
        const hasBorderMultiple = sides.some(side => borderKeys.includes(side));

        if (hasBorderMultiple) {
            for (const dir in border) {
                const dirStyles = border[dir];
                borderStyles = { ...borderStyles, [`border${capitalizeWord(dir)}`]: Object.values(dirStyles).join(' ') }
            }
        } else {
            borderStyles = { border: Object.values(border).join(' ') };
        }

        style = { ...style, ...borderStyles };

        return style;
    };

    return (
        <Tooltip text={__('Preview', 'wecodeart')}>
            <Button style={generateStyles(formData)}>
                <Icon icon={() => {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
                            {paths.map(el => {
                                return (
                                    <path fill="currentColor" d={el} />
                                );
                            })}
                        </svg>
                    )
                }} />
            </Button>
        </Tooltip>
    );
}

export default Toggler;