"use strict";

angular.module('CopyToClipboardApp', [])
	.directive('copyToClipboard', copyToClipboard);

copyToClipboard.$inject = [];

function copyToClipboard () {
	return {
		restrict: 'AE',
		scope: {
			copyValue: '@',
			copySelect: '@',
			copyLabel: '@'
		},
		link: function (scope, element, attr) {
			element[0].classList.add('copy-to-clipboard-wrap');
			var setIdStyle = 'style-copy-clipboard';
			var styleHead = document.createElement('style');
			var head = document.head || document.getElementsByTagName('head')['0'];
			styleHead.setAttribute('id', setIdStyle);
			styleHead.innerHTML = `
				.copy-border-radius {
					border-radius: 2px;
					-moz-border-radius: 2px;
					-webkit-border-radius: 2px;
				}
				.copy-to-clipboard-wrap {
					position: relative;
				}
				.btn-copy-to-clipboard {
					background-color: white;
					border: 1px solid #e2e2e2;
					position: absolute;
					bottom: 100%;
					margin-left: 1rem;
					cursor: pointer;
				}
				.btn-copy-to-clipboard:focus {
					outline: none;
				}
				.tooltip-copy {
					position: absolute;
					right: 100%;
					top: 0;
					padding: .45rem .7rem;
					background-color: rgba(0,0,0,.75);
					color: white;
					white-space: nowrap;
					margin-right: 6px;
				}
				.tooltip-copy:after {
					content: '';
					border-width: 6px;
					border-style: solid;
					border-color: transparent transparent transparent rgba(0,0,0,.75);
					position: absolute;
					left: 100%;
					top: 50%;
					margin-top: -6px;
				}
			`;
			var getStyleId = document.getElementById(setIdStyle);
			if(getStyleId == null) {
				head.appendChild(styleHead);
			}
			var copySl = scope.copySelect == undefined ? 'text' : scope.copySelect;
			var copyLabel = scope.copyLabel == undefined ? 'Copy' : scope.copyLabel;
			var btnCopy = document.createElement('button');
			var tooltipCopy = document.createElement('span');
			tooltipCopy.classList.add('tooltip-copy', 'copy-border-radius');
			tooltipCopy.innerText = 'Đã copy thành công!';
			btnCopy.classList.add('btn-copy-to-clipboard', 'copy-border-radius');
			btnCopy.innerHTML = copyLabel;
			btnCopy.onclick = function(e) {
				var getTxt = element[0].innerText.slice(0, 0 - btnCopy.innerText.length);
				if (copySl == 'text') {
					copyTextToClipboard(getTxt);
				}
				btnCopy.appendChild(tooltipCopy);
				setTimeout(function () {
					tooltipCopy.remove();
				}, 2000);
			};
			element[0].appendChild(btnCopy);
		}
	}
}

function copyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
}
