'use strict';

import React,{Component} from 'react';

import './Copyright.less';

const imageAliPay = require('./images/alipay.png');
const imageWechatPay = require('./images/wechatpay.jpg');

class Copyright extends Component {
    render() {
        return (
            <div className = "copyrightBox">
                <div className = "line"><span>ABOUT ME</span></div>
                <div className = "about">
                    <div className = "aboutAvatar"><img src = "https://ss0.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=271209831,385492944&fm=21&gp=0.jpg" alt="头像"/></div>
                    <a className = "aboutName" href = "https://blog.cocbin.com">Cocbin</a>
                    <div className = "aboutInfo">大家好，我是Cocbin，广东汕头人,在校大学生，是一个外表冷静，内心狂热，沉默而实际富有思想和内涵的人。擅长Web,iOS,Android开发。半吊子设计师。</div>
                    <a className = "aboutMyBlog" href="https://blog.cocbin.com">https://blog.cocbin.com</a>
                    <div className = "aboutMyShare">
                        <a href="https://github.com/cocbin"><span className = "iconfont iconGithub">&#xe624;</span></a>
                        <a href="https://github.com/cocbin"><span className = "iconfont iconWechart">&#xe612;</span></a>
                    </div>

                    <div className="aboutPay">如果我的博客对你有帮助,可以扫下面的二维码打赏我喔!</div>
                    <div className = "pay">
                        <div className = "code"><img src = {imageAliPay} alt="支付宝"/><span>支付宝</span></div>
                        <div className = "code"><img src = {imageWechatPay} alt="微信"/><span>微信</span></div>
                    </div>
                </div>

                <div className = "line"><span>LINK</span></div>

                <div className = "link">
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>
                    <a href="https://blog.cospotato.com/">土豆自留地</a>

                </div>

                <div className = "line"><span>COPYRIGHT</span></div>
                <div className = "copyright">Copyright © 2016 Cocbin. All rights reserved.<br/>粤ICP备15010988号</div>
            </div>
        )
    }
}


module.exports = Copyright;