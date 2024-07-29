const {
    i18n: {
        __,
    },
    components: {
        TextControl,
        ToggleControl,
        Card,
        CardHeader,
        CardBody,
        BaseControl,
        DropdownMenu,
        SelectControl,
        ColorPalette,
        ColorIndicator,
        __experimentalHStack: HStack,
    }
} = wp;

const OffcanvasOpts = ({ formData, setFormData, setStyle, colors }) => {
    return (
        <Card className="border shadow-none h-100">
            <CardHeader>
                <h5 className="text-uppercase fw-medium m-0">{__('Offcanvas', 'wecodeart')}</h5>
            </CardHeader>
            <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                <p>
                    <SelectControl
                        label={__('Position', 'wecodeart')}
                        value={formData?.offcanvas?.position}
                        options={[
                            { label: __('Top', 'wecodeart'), value: 'top' },
                            { label: __('Bottom', 'wecodeart'), value: 'bottom' },
                        ]}
                        onChange={position => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    position
                                }
                            }
                        })}
                        help={__('Relative to the browser window.', 'wecodeart')}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <TextControl
                        label={__('Title', 'wecodeart')}
                        value={formData?.offcanvas?.title}
                        onChange={title => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    title
                                }
                            }
                        })}
                        help={__('The title for the offcanvas.', 'wecodeart')}
                    />
                </p>
                <p>
                    <SelectControl
                        label={__('Backdrop', 'wecodeart')}
                        value={formData?.offcanvas?.backdrop}
                        options={[
                            { label: __('Enabled', 'wecodeart'), value: 'true' },
                            { label: __('Static', 'wecodeart'), value: 'static' },
                            { label: __('Disabled', 'wecodeart'), value: 'false' },
                        ]}
                        onChange={backdrop => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    backdrop
                                }
                            }
                        })}
                        help={formData?.offcanvas?.backdrop !== 'false' && sprintf(
                            __('Clicking backdrop will %s offcanvas.', 'wecodeart'),
                            formData?.offcanvas?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart')
                        )}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Allow scroll', 'wecodeart')}
                        checked={formData?.offcanvas?.scroll}
                        onChange={scroll => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    scroll
                                }
                            }
                        })}
                        help={sprintf(
                            __('Scroll is %s when offcanvas is active.', 'wecodeart'),
                            formData?.offcanvas?.scroll ? __('allowed', 'wecodeart') : __('not allowed', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Show close button', 'wecodeart')}
                        checked={formData?.offcanvas?.close}
                        onChange={close => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    close
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas close button is %s.', 'wecodeart'),
                            formData?.offcanvas?.close ? __('shown', 'wecodeart') : __('not shown', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Keyboard control', 'wecodeart')}
                        checked={formData?.offcanvas?.keyboard}
                        onChange={keyboard => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    keyboard
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas %s be closed with ESC key.', 'wecodeart'),
                            formData?.offcanvas?.keyboard ? __('can', 'wecodeart') : __('cannot', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <BaseControl label={__('Colors', 'wecodeart')}>
                        <HStack style={{ justifyContent: 'flex-start' }}>
                            <DropdownMenu
                                label={__('Background Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.offcanvas?.style?.backgroundColor} />}
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
                                        value={formData?.offcanvas?.style?.backgroundColor}
                                        onChange={backgroundColor => setStyle({ backgroundColor })}
                                    />
                                )}
                            </DropdownMenu>
                            <DropdownMenu
                                label={__('Text Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.offcanvas?.style?.color} />}
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
                                        value={formData?.offcanvas?.style?.color}
                                        onChange={color => setStyle({ color })}
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

export default OffcanvasOpts;