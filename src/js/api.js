import axios from 'axios';

export default {
    send: (options) => {
        axios
            .post(options.url, options.data, options.reqConfig)
            .then((response) => {
                const data = response.data;
                if (!data || data.code !== 0) {
                    options.error && options.error(data && data.msg);
                    return;
                }
                options.success && options.success(data);
            })
            .catch((e) => {
                console.error(e);
                options.error && options.error();
            });
    },

    read: (options) => {
        axios
            .get(options.url, options.reqConfig)
            .then((response) => {
                const data = response.data;
                if (!data || data.code !== 0) {
                    options.error && options.error(data && data.msg);
                    return;
                }
                options.success && options.success(data.data);
            })
            .catch((e) => {
                console.error(e);
                options.error && options.error();
            });
    },
};
