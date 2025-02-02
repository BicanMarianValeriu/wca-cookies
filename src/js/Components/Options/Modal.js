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

const ModalOpts = ({ formData, setFormData, setStyle, colors }) => {
    return (
        <Card className="border shadow-none h-100">
            <CardHeader>
                <h5 className="text-uppercase fw-medium m-0">{__('Modal', 'wecodeart')}</h5>
            </CardHeader>
            <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                <p>
                    <SelectControl
                        label={__('Position', 'wecodeart')}
                        value={formData?.modal?.position}
                        options={[
                            { label: __('Top', 'wecodeart'), value: 'top' },
                            { label: __('Centered', 'wecodeart'), value: 'centered' },
                            { label: __('Custom', 'wecodeart'), value: 'custom' },
                        ]}
                        onChange={position => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    position
                                }
                            }
                        })}
                        help={__('Relative to the browser window.', 'wecodeart')}
                    />
                </p>
                <p>
                    <TextControl
                        label={__('Title', 'wecodeart')}
                        value={formData?.modal?.title}
                        onChange={title => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    title
                                }
                            }
                        })}
                        help={__('The title for the modal.', 'wecodeart')}
                    />
                </p>
                <p>
                    <SelectControl
                        label={__('Backdrop', 'wecodeart')}
                        value={formData?.modal?.backdrop}
                        options={[
                            { label: __('Enabled', 'wecodeart'), value: 'true' },
                            { label: __('Static', 'wecodeart'), value: 'static' },
                            { label: __('Disabled', 'wecodeart'), value: 'false' },
                        ]}
                        onChange={backdrop => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    backdrop
                                }
                            }
                        })}
                        help={formData?.modal?.backdrop !== 'false' && sprintf(
                            __('Clicking backdrop will %s modal.', 'wecodeart'),
                            formData?.modal?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Close offcanvas', 'wecodeart')}
                        checked={formData?.modal?.closeOffcanvas}
                        onChange={closeOffcanvas => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    closeOffcanvas
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas will %s when modal is active.', 'wecodeart'),
                            formData?.modal?.closeOffcanvas ? __('close', 'wecodeart') : __('not close', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Show close button', 'wecodeart')}
                        checked={formData?.modal?.close}
                        onChange={close => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    close
                                }
                            }
                        })}
                        help={sprintf(
                            __('Modal close button is %s.', 'wecodeart'),
                            formData?.modal?.close ? __('shown', 'wecodeart') : __('not shown', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Keyboard control', 'wecodeart')}
                        checked={formData?.modal?.keyboard}
                        onChange={keyboard => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    keyboard
                                }
                            }
                        })}
                        help={sprintf(
                            __('Modal %s be closed with ESC key.', 'wecodeart'),
                            formData?.modal?.keyboard ? __('can', 'wecodeart') : __('cannot', 'wecodeart')
                        )}
                    />
                </p>
                <p>
                    <BaseControl label={__('Colors', 'wecodeart')}>
                        <HStack style={{ justifyContent: 'flex-start' }}>
                            <DropdownMenu
                                label={__('Background Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.modal?.style?.backgroundColor} />}
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
                                        value={formData?.modal?.style?.backgroundColor}
                                        onChange={backgroundColor => setStyle({ backgroundColor }, 'modal')}
                                    />
                                )}
                            </DropdownMenu>
                            <DropdownMenu
                                label={__('Text Color', 'wecodeart')}
                                icon={<ColorIndicator colorValue={formData?.modal?.style?.color} />}
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
                                        value={formData?.modal?.style?.color}
                                        onChange={color => setStyle({ color }, 'modal')}
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

export default ModalOpts;