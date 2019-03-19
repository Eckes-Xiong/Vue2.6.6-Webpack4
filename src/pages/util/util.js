export const ajax = new (class myajax {
    constructor() {
        this.opt = (option = null) => {
            const opt = {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: option ? JSON.stringify(option.data) : null
            };
            return option ? opt : Object.assign(opt, option);
        };
        this.send = (...option) => this.race(...option)
    }

    race(...option) {
        let cb;
        Promise.race([
            fetch(...option),
            new Promise((resolve, reject) => {
                //Toast.loading('Loading...', 0)
                setTimeout(() => reject(new Error('请求超时')), 5000)
            })
        ]).then(res => {
            //Toast.hide();
            switch (res.status) {
                case 200:
                    return res.json();
                case 500:
                    //Toast.info('服务异常', 1);
                    return res.json();
                case 502:
                    //Toast.info('网络联接失败,请检查您的网络', 1);
                    return
                case 504:
                    alert('服务器超时');
                    //Toast.info('服务器超时，稍等请重试', 1);
                    return
                case 401:
                    //ajaxRoutes.token = false;
                    //this.login();
                    location.href='/admin/index/#login';
                    return;
            }
        }).then(response => {
            if (response.code == 1) {
                cb(response);
            } else {
                //Toast.info(response.message, 1);
                alert(response.message);
            }
            return response;
        }).catch(error => {
            //Toast.info(error)
        });
        return {
            done: (fn) => {
                cb = fn;
            }
        }
    }

    get(url, option = null) {
        return this.send(url,
            Object.assign({}, this.opt(option), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            })
        );
    }

    post(url, option = null) {
        return this.send(url,
            Object.assign({}, this.opt(option), {
                method: 'POST',
            })
        );
    }

    put(url, option = null) {
        return this.send(url,
            Object.assign({}, this.opt(option), {
                method: 'PUT',
            })
        );
    }

    del(url, option = null) {
        return this.send(url,
            Object.assign({}, this.opt(option), {
                method: 'DELETE',
            })
        );
    }

    login() {
        window.sessionStorage.removeItem('token');
        prompt(
            '登陆',
            '登陆超时，请重新登陆！',
            [{
                text: '取消',
                onPress: () => {
                    location.href = '/login'
                }
            },
                {
                    text: '登陆',
                    onPress: (login, password) => {
                        fetch(ajaxRoutes.login(), {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify({
                                "rememberMe": false,
                                "userCode": login,
                                "password": md5(password)
                            })
                        }).then(res => {
                            Toast.hide();
                            switch (res.status) {
                                case 200:
                                    return res.json();
                                case 500:
                                    //Toast.info('服务异常', 1);
                                    return res.json();
                                case 502:
                                    //Toast.info('网络联接失败,请检查您的网络', 1);
                                    return
                                case 504:
                                    //Toast.info('服务器超时，稍等请重试', 1);
                                    return
                                case 401:
                                    //ajaxRoutes.token = false;
                                    this.login();
                                    return;
                            }
                        }).then(response => {
                            if (response.code == 1) {
                                window.sessionStorage.setItem('token', true);
                                location.reload();
                            } else {
                                //Toast.info(response.data, 1);
                                setTimeout(() => {
                                    this.login();
                                }, 1000)
                            }
                        });
                    }
                }
            ],
            'login-password', null, ['用户名', '密码'],
        )
    }

    upfile(url, option = null) {
        const formData = new FormData();
        formData.append('file', option);
        return this.send(url, {
            method: "POST",
            body: formData
        });
    }
});