import React, { useRef, useEffect, useCallback } from 'react';
import * as S from './style';
import { originalCharacter, randomColor, randomNum } from './utils';
import { isFunction } from 'lodash';
import cs from 'classnames';
var Captcha = function (_a) {
    var _b = _a.height, height = _b === void 0 ? 40 : _b, _c = _a.width, width = _c === void 0 ? 100 : _c, _d = _a.bgColor, bgColor = _d === void 0 ? '#DFF0D8' : _d, _e = _a.charNum, charNum = _e === void 0 ? 4 : _e, _f = _a.fontSize, fontSize = _f === void 0 ? 25 : _f, onChange = _a.onChange, className = _a.className;
    var canvas = useRef(null);
    var generateCaptcha = useCallback(function () {
        var checkCode = '';
        if (canvas.current) {
            var ctx = canvas.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, width, height);
                for (var i = 0; i < charNum; i++) {
                    var charGap = Math.round(width / charNum);
                    var offset = Math.round(charGap / 2) - 6;
                    var code = originalCharacter[randomNum(0, originalCharacter.length - 1)];
                    checkCode += code;
                    ctx.save();
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = randomColor();
                    ctx.font = fontSize + "px serif";
                    ctx.rotate((Math.PI / 180) * randomNum(-5, 5));
                    ctx.strokeText(code, offset + i * charGap, height / 2 + 8);
                    ctx.beginPath();
                    ctx.moveTo(randomNum(0, width), randomNum(0, height));
                    ctx.lineTo(randomNum(0, width), randomNum(0, height));
                    ctx.stroke();
                    ctx.restore();
                }
                return checkCode;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    }, []);
    var handleClick = useCallback(function () {
        if (isFunction(onChange)) {
            var captcha = generateCaptcha();
            onChange(captcha);
        }
    }, [onChange]);
    useEffect(function () {
        if (isFunction(onChange)) {
            var captcha = generateCaptcha();
            onChange(captcha);
        }
    }, []);
    return (React.createElement(S.SCaptcha, { className: cs('react-captcha', className), onClick: handleClick, height: height, width: width, ref: canvas }));
};
export default Captcha;
