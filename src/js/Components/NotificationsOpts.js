const {
    i18n: {
        __,
    },
    components: {
        Card,
        CardHeader,
        CardBody,
        TextControl,
        ToggleControl,
        __experimentalNumberControl: NumberControl,
    },
} = wp;

const NotificationsOpts = ({ formData, setFormData }) => {
    return (
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
    );
};

export default NotificationsOpts;