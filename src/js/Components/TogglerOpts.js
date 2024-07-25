const {
    i18n: {
        __,
    },
    components: {
        Card,
        CardHeader,
        CardBody,
        BaseControl,
        RangeControl,
        DropdownMenu,
        SelectControl,
        ColorPalette,
        ColorIndicator,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    }
} = wp;

const TogglerOpts = ({ formData, setFormData, setStyle, colors }) => {
    return (
        <Card className="border shadow-none h-100">
            <CardHeader>
                <h5 className="text-uppercase fw-medium m-0">{__('Toggler', 'wecodeart')}</h5>
            </CardHeader>
            <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                <p>
                    <SelectControl
                        label={__('Position', 'wecodeart')}
                        value={formData?.toggler?.position}
                        options={[
                            { label: __('Left', 'wecodeart'), value: 'left' },
                            { label: __('Right', 'wecodeart'), value: 'right' },
                        ]}
                        onChange={position => setFormData({
                            ...formData, ...{
                                toggler: {
                                    ...formData?.toggler,
                                    position
                                }
                            }
                        })}
                        help={__('Relative to the browser window.', 'wecodeart')}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <HStack>
                        <NumberControl
                            isShiftStepEnabled={true}
                            spinControls="custom"
                            label={__('Horizontal Margin', 'wecodeart')}
                            help={__('Number of pixels for horizontal window distance.', 'wecodeart')}
                            min={0}
                            value={formData?.toggler?.style?.left}
                            onChange={value => setStyle({ left: parseInt(value) }, 'toggler')}
                        />
                        <NumberControl
                            isShiftStepEnabled={true}
                            spinControls="custom"
                            label={__('Vertical Margin', 'wecodeart')}
                            help={__('Number of pixels for vertical window distance.', 'wecodeart')}
                            min={0}
                            value={formData?.toggler?.style?.bottom}
                            onChange={bottom => setStyle({ bottom: parseInt(bottom) }, 'toggler')}
                        />
                    </HStack>
                </p>
                <p>
                    <NumberControl
                        isShiftStepEnabled={true}
                        spinControls="custom"
                        label={__('Size', 'wecodeart')}
                        min={20}
                        value={formData?.toggler?.style?.width}
                        onChange={size => setStyle({ width: parseInt(size), height: parseInt(size) }, 'toggler')}
                        help={__('In pixels.', 'wecodeart')}
                    />
                </p>
                <p>
                    <NumberControl
                        isShiftStepEnabled={true}
                        spinControls="custom"
                        label={__('Padding', 'wecodeart')}
                        min={0}
                        value={formData?.toggler?.style?.padding}
                        onChange={padding => setStyle({ padding: parseInt(padding) }, 'toggler')}
                        help={__('In pixels.', 'wecodeart')}
                    />
                </p>
                <p>
                    <BorderBoxControl
                        colors={colors}
                        label={__('Border', 'wecodeart')}
                        value={formData?.toggler?.style?.border}
                        onChange={border => setStyle({ border }, 'toggler')}
                        help={__('In pixels.', 'wecodeart')}
                    />
                </p>
                <p>
                    <RangeControl
                        label={__('Radius', 'wecodeart')}
                        allowReset={true}
                        value={formData?.toggler?.style?.borderRadius}
                        onChange={borderRadius => setStyle({ borderRadius }, 'toggler')}
                        min={0}
                    />
                </p>
                <p>
                    <BaseControl label={__('Colors', 'wecodeart')}>
                        <HStack style={{ justifyContent: 'flex-start' }}>
                            <DropdownMenu
                                label={__('Background Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.toggler?.style?.backgroundColor} />}
                                toggleProps={{
                                    style: {
                                        height: 'initial',
                                        minWidth: 'initial',
                                        padding: 0
                                    }
                                }}
                                popoverProps={{
                                    focusOnMount: 'container',
                                    position: 'bottom',
                                    noArrow: false,
                                }}
                            >
                                {() => (
                                    <ColorPalette
                                        colors={colors}
                                        enableAlpha
                                        value={formData?.toggler?.style?.backgroundColor}
                                        onChange={backgroundColor => setStyle({ backgroundColor }, 'toggler')}
                                    />
                                )}
                            </DropdownMenu>
                            <DropdownMenu
                                label={__('Icon Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.toggler?.style?.color} />}
                                toggleProps={{
                                    style: {
                                        height: 'initial',
                                        minWidth: 'initial',
                                        padding: 0
                                    }
                                }}
                                popoverProps={{
                                    focusOnMount: 'container',
                                    position: 'bottom',
                                    noArrow: false,
                                }}
                            >
                                {() => (
                                    <ColorPalette
                                        colors={colors}
                                        enableAlpha
                                        value={formData?.toggler?.style?.color}
                                        onChange={color => setStyle({ color }, 'toggler')}
                                    />
                                )}
                            </DropdownMenu>
                        </HStack>
                    </BaseControl>
                </p>
            </CardBody>
        </Card>
    );
};

export default TogglerOpts;