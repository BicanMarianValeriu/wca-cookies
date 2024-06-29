/**
 * @package: 	WeCodeArt Cookies Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

import Toggler from './Components/Toggler';
import ScanCookies from './Components/Modal';

const {
    i18n: {
        __,
        _x,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        Notice,
        TextControl,
        BaseControl,
        RangeControl,
        DropdownMenu,
        SelectControl,
        ToggleControl,
        ColorPalette,
        ColorIndicator,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting,
    },
} = wp;

const getEditorUrl = (object = {}) => {
    const url = new URL(`${wecodeart.adminUrl}/site-editor.php`);
    Object.keys(object).map(key => url.searchParams.append(key, object[key]));

    return url.toString();
}

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/cookies/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wca-cookies',
        title: __('Cookies', 'wecodeart'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading', 'wecodeart'),
            instructions: __('Please wait, loading settings...', 'wecodeart')
        }} />;
    }

    const apiOptions = (({ cookies }) => (cookies))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);
    const [isOpen, setIsOpen] = useState(false);

    const setStyle = (extra = {}, container = 'offcanvas') => {
        const newStyle = { ...formData?.[container]?.style, ...extra };

        setFormData({
            ...formData, ...{
                [container]: {
                    ...formData?.[container],
                    style: newStyle
                }
            }
        });
    };

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'wecodeart'));
    };

    const colors = useSetting('color.palette');

    return (
        <>
            {formData.notice !== false && (
                <Notice status="info" className="border-top border-bottom border-end mb-3" onRemove={() => setFormData({ ...formData, notice: false })}>
                    <p className="my-0" dangerouslySetInnerHTML={{
                        __html: sprintf(
                            _x('You can edit module messages/templates under %s.', 'wecodeart'),
                            `<a href="${getEditorUrl({
                                path: '/patterns',
                                categoryType: 'wp_template_part',
                                categoryId: 'wca-cookies',
                            })}" target="_blank">${__('Site Editor', 'wecodeart')}</a>`
                        )
                    }} />
                </Notice>
            )}
            <div className="grid" style={{ '--wca--columns': 2 }}>
                <div className="g-col-2">
                    <Card className="border shadow-none h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Cookies', 'wecodeart')}</h5>
                            <Button className="button" onClick={() => setIsOpen(true)}>{__('Detect cookies', 'wecodeart')}</Button>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('Block cookies', 'wecodeart')}
                                    checked={formData?.cookies?.block}
                                    onChange={block => setFormData({
                                        ...formData, cookies: {
                                            ...formData?.cookies,
                                            block
                                        }
                                    })}
                                    help={sprintf(
                                        __('Cookies are %s until accepted.', 'wecodeart'),
                                        formData?.cookies?.block ? __('blocked', 'wecodeart') : __('not blocked', 'wecodeart')
                                    )}
                                />
                            </p>
                            <p>
                                <NumberControl
                                    label={__('Expiration', 'wecodeart')}
                                    value={formData?.cookies?.expire}
                                    onChange={expire => setFormData({
                                        ...formData, cookies: {
                                            ...formData?.cookies,
                                            expire
                                        }
                                    })}
                                    help={__('Duration for cookie accept|reject - in days.', 'wecodeart')}
                                />
                            </p>
                            <p>
                                <TextControl
                                    label={__('Necessary cookies', 'wecodeart')}
                                    value={formData?.cookies?.necessary}
                                    onChange={necessary => setFormData({
                                        ...formData, cookies: {
                                            ...formData?.cookies,
                                            necessary
                                        }
                                    })}
                                    help={__('These cookies are stictly necessary and website cannot function properly without them.', 'wecodeart')}
                                />
                            </p>
                            <p>
                                <TextControl
                                    label={__('Necessary cookies prefix', 'wecodeart')}
                                    value={formData?.cookies?.necessaryPrefix}
                                    onChange={necessaryPrefix => setFormData({
                                        ...formData, cookies: {
                                            ...formData?.cookies,
                                            necessaryPrefix
                                        }
                                    })}
                                    help={__('Cookies starting with these prefixes will also be considered necessary.', 'wecodeart')}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
                <div className="g-col-1">
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
                </div>
                <div className="g-col-1">
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
                                    __nextHasNoMarginBottom
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
                                    __nextHasNoMarginBottom
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
                </div>
                <div className="g-col-1">
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
                </div>
                <div className="g-col-1">
                    <Card className="border shadow-none h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Notifications', 'wecodeart')}</h5>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('Toast confirmation', 'wecodeart')}
                                    checked={formData?.toast?.enable}
                                    onChange={enable => setFormData({
                                        ...formData, toast: {
                                            ...formData?.toast,
                                            enable
                                        }
                                    })}
                                    help={sprintf(
                                        __('Toast confirmation messages are %s.', 'wecodeart'),
                                        formData?.toast.enable ? __('enabled', 'wecodeart') : __('disabled', 'wecodeart')
                                    )}
                                />
                            </p>
                            <p>
                                <NumberControl
                                    label={__('Delay time', 'wecodeart')}
                                    value={formData?.toast?.delay}
                                    disabled={!formData?.toast?.enable}
                                    onChange={delay => setFormData({
                                        ...formData, toast: {
                                            ...formData?.toast,
                                            delay
                                        }
                                    })}
                                    help={__('Duration of the toast message - in miliseconds.', 'wecodeart')}
                                />
                            </p>
                            <p>
                                <TextControl
                                    label={__('Confirm message', 'wecodeart')}
                                    value={formData?.toast?.confirm}
                                    disabled={!formData?.toast?.enable}
                                    onChange={confirm => setFormData({
                                        ...formData, toast: {
                                            ...formData?.toast,
                                            confirm
                                        }
                                    })}
                                    help={__('This message is displayed after user accepts cookies.', 'wecodeart')}
                                />
                            </p>
                            <p>
                                <TextControl
                                    label={__('Reject message', 'wecodeart')}
                                    value={formData?.toast?.reject}
                                    disabled={!formData?.toast?.enable}
                                    onChange={reject => setFormData({
                                        ...formData, toast: {
                                            ...formData?.toast,
                                            reject
                                        }
                                    })}
                                    help={__('This message is displayed after user rejects cookies.', 'wecodeart')}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Toggler {...{ formData: formData?.toggler }} />
            {isOpen && <ScanCookies formData={formData} setFormData={setFormData} createNotice={createNotice} closeModal={() => setIsOpen(false)} />}
            <hr style={{ margin: '20px 0' }} />
            <Button
                className="button"
                isPrimary
                isLarge
                icon={loading && <Spinner />}
                onClick={() => {
                    setLoading(true);
                    saveSettings({ cookies: formData }, handleNotice);
                }}
                {...{ disabled: loading }}
            >
                {loading ? '' : __('Save', 'wecodeart')}
            </Button>
        </>
    );
};

export default Options;