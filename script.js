/*where does javascript go? Javascript Goes Here*/


function visitedButton(butt) {
    $(butt).removeClass("active");
    $(butt).addClass("visited");

    $(butt + " img").each(function (index) {
        $(this).attr("src", $(this).attr("src").replace("active", "visited"));
    });
}

function activeButton(butt) {
    $(butt).removeClass("visited");
    $(butt).removeClass("inactive");
    $(butt).addClass("active");

    $(butt + " img").each(function (index) {
        $(this).attr("src", $(this).attr("src").replace("visited", "active"));
        $(this).attr("src", $(this).attr("src").replace("inactive", "active"));
    });
} //crazy-egg

//Validation Message -- call this if you need validations on fields injected through AJAH
function initializeValidations() {

$(".form .required").parent().addClass("required-parent");
$(".form select.required").parent().addClass("required-select");

var errorTop = '<div class="validation-message validation-error-container clearfix"><span class="validation-error"><table class="error-message-hover"><tr class="row-1"><td class="cell-1-1"></td><td class="cell-1-2"></td><td class="cell-1-3"></td><td class="cell-1-4" rowspan="3"></td></tr><tr class="row-2"><td class="cell-2-1"></td><td class="cell-2-2">'
var errorBottom = '</td><td class="cell-2-3"></td></tr><tr class="row-3"><td class="cell-3-1"></td><td class="cell-3-2"></td><td class="cell-3-3"></td></tr></table></span></div>'

$(".form input[type*='text'].required, .form input[type*='password'].required, .form textarea.required").blur(function () {
    $(this).parent().find(".validation-message").remove();
    if ($(this).val() == "") {
      	var text = $(this).attr("data-required");
      	$(this).before(errorTop + text + errorBottom).addClass("error-field");
    }
    else {
      	$(this).before('<span class="validation-message validation-confirm"></span>').removeClass("error-field");
    }
});

$(".form select.required").change(function () {
    $(this).parent().find(".validation-message").remove();
    if ($(this).val() == "") {
      	var text = $(this).attr("data-required");
      	$(this).before(errorTop + text + errorBottom).addClass("error-select"); ;
    }
    else {
      	$(this).before('<span class="validation-message validation-confirm"></span>').removeClass("error-select");
    }
});
}

$(document).ready(function () {

	//unclickable items don't go to their href
	$(".unclickable").click(function (event) {
		event.preventDefault();
	});

	//On Before Unload Promt so people will not loose unsaved data
	window.onbeforeunload = function () {
		if ($("body").hasClass("no-leave")) {
			return '----------------------------------------------------------------------------------------------------------------------------------------------------------------------- Are you sure you want to navigate away from this page? You will lose any non-saved text Press OK to continue, or Cancel to stay on the current page. ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- ';
		}
	}
	//Browser Check
	var browserMessagePrefix = '<div class="row clearfix"><div class="dialog-box warning clearfix">'
	var browserMessageSuffix = '<div class="close"><a href="#">[close]</a></div></div></div>'
	if ($.browser.mozilla || $.browser.webkit || $.browser.msie) {
		if ($.browser.mozilla && $.browser.version.substr(0, 3) < "1.9") {
			$(browserMessagePrefix + '<p>This version of Fire Fox is out of date and will limit your experience, please ask on of the "System\'s Engineers" to istall the latest version."</p>' + browserMessageSuffix).insertBefore(".header"); ;
		}
		else if ($.browser.msie && $.browser.version < 7) {
			$(browserMessagePrefix + '<p>This version of Internet Explorer is out-of-date, please ask one of the "System\'s Engineers" to install the latest version.</p>' + browserMessageSuffix).insertBefore(".header");
		}
	}
	else {
		$(browserMessagePrefix + '<p>This is an incompatible browser, please use one from the list.</p><ul><li>Internet Explorer 7 and Above</li><li>Fire Fox 3 and Above</li><li>Safari and Google Chrome</li></ul>' + browserMessageSuffix).insertBefore(".header");
	}

	//Focus Blur Text Fields
	$(".text-field, .text-field-1").focus(function () {
		$(this).addClass("focused");
	});
	$(".text-field, .text-field-1").blur(function () {
		$(this).removeClass("focused");
	});
	


	//Activate CK Editor
	//$('.ckeditor').ckeditor();

	//DONT Activate CK Editor Limited Tool Bars
	var config = {
		toolbar: [
			['Source'],
			['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
			['UIColor']
		]
	};
	//$('.ckeditor-limited-1').ckeditor(config);

	//Close Error
	$(".dialog-box .close").click(function () {
		$(this).parent(".dialog-box").fadeOut("slow");
		$(this).fadeOut("slow"); //fixes IE
		return false;
	});

	//Date Picker
	$(".datepicker").parent("li").find(".datepicker").datepicker();

	//Removes Default Menu Action
	$(".inactive-menu a").click(function () {
		return false;
	});

	//Simple Tabs
	$(".inner-tabs .js-tabs a").click(function (event) {
		$(this).parent().parent().find("li").removeClass("current");
		$(this).parent().addClass("current");
		var currentTab = $(this).attr("href");
		var HiddenTabs = $(this).parent().parent().attr("id");
		$("." + HiddenTabs).hide();
		$(currentTab).fadeIn(500);
		event.preventDefault();
	});

	//Toggle with ID  as Anchor
	$("a.toggle").click(function () {
		var ToggleID = $(this).attr("href");
		$(ToggleID).slideToggle("slow");
		$(this).toggleClass("toggle-icon toggle-icon-off");
		return false;
	});

	$("input.toggle").change(function () {
		var ToggleID = $(this).attr("alt");
		$("#" + ToggleID).slideToggle("slow");
		return false;
	});

	//Accordion
	$(".accordion li .open").click(function () {
		var checkElement = $(this).next().next("ul");
		$(checkElement).slideToggle("normal");
		$(checkElement).toggleClass("current-click-child");
		$(checkElement).prev("a").toggleClass("current-click-parent");
		//$(checkElement).find("ul:visible").slideToggle('normal');
		if ($(this).children().attr("src") == "images/plus-open.png") {
			$(this).children().attr("src", "images/minus-close.png");
		}
		else {
			$(this).children().attr("src", "images/plus-open.png");
		}
		return false;
	});

	//var originalValue = $(".default-dialog").html();

	//Confirm Links
	$(".confirm").click(function () {
		var cofirmNewDialog = $(this).attr("rev");
		var confirmBoxId = $(this).attr("rel");
		var confirmText = $(this).html();
		$(".confirm-added-dialog").html("");
		$(".overlay").show();
		$("#" + confirmBoxId).fadeIn("normal");
		if ($(this).hasClass("addDialog")) {
			$("#" + confirmBoxId + " .confirm-added-dialog").html(confirmText);
		}
		if ($(this).attr("rev") != "") {
			$("#" + confirmBoxId + " .default-dialog").html($(this).attr("rev"));
		}
		return false;
	});

	$(".confirm-box").css("left", $(window).width() / 2 - ($(".confirm-box").width() / 2));

	//Confirm Box
	$(".confirm-ok, .confirm-no").click(function () {
		$(this).parent().parent().fadeOut("normal");
		$(".overlay").hide();
	});

	$(".confirm-ok").click(function () {
		return false;
	});

	$(".confirm-no").click(function () {
		return false;
	});

	//Prints Overlay <div> can be reused by everything
	$(".flare-bg").after('<div class="hide overlay"></div>');

	//Disabled Nav Item
	$(".nav-tabs li.disabled a").click(function () {
		return false;
	});

	initializeValidations();

	//Smooth Scrolling
	$(".scroll").click(function (event) {
		//prevent the default action for the click event
		event.preventDefault();

		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;

		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];

		//get the top offset of the target anchor
		var target_offset = $("#" + trgt).offset();
		var target_top = target_offset.top;

		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({ scrollTop: target_top }, 500);
	});

	//Super Sucker Fish Activation
	$("ul.sf-menu").superfish();

	//Adds Drop Shadow to the top of the menu
	$("ul.sf-menu ul").find("li:first").not("ul.sf-menu ul ul").addClass("child-1-first");

	$(".overlay, .preview-close a, .preview-close img").click(function (event) {
		$(".overlay").delay(200).fadeOut(100);
		$(".fb-preview-pain").fadeOut(300);
		event.preventDefault();
	});

	//Highlight Table Rows
	$.each($(".table-summary .check-box"), function (index, value) {
		$(value).click(function () {
			toggleRowColor(this.checked, $(this));
		});
		toggleRowColor(this.checked, $(this));
	});

	function toggleRowColor(checked, checkbox) {
		if (checked) checkbox.parent().parent().addClass("selected-row");
		else checkbox.parent().parent().removeClass("selected-row");
	}

	//Select ALL
	$("#select-all").toggle(function () {
		$(".table-summary").find(".check-box").attr("checked", "true").parent().parent().addClass("selected-row");
		$(this).find("span").text("Select None");
	}, function () {
		$(".table-summary").find(".check-box").attr("checked", "").parent().parent().removeClass("selected-row");
		$(this).find("span").text("Select All");
	});

	//Remove Select
	$("#remove-select").click(function (event) {
		$(".table-summary").find(".check-box").attr("checked", "").parent().parent().removeClass("selected-row");
		event.preventDefault();
	});

});

//Jquery Plugins

//Tipsy: Twitter Styled Tip Layer Plugin
(function ($) {
	$.fn.tipsy = function (options) {

		options = $.extend({}, $.fn.tipsy.defaults, options);

		return this.each(function () {

			var opts = $.fn.tipsy.elementOptions(this, options);

			$(this).hover(function () {

				$.data(this, 'cancel.tipsy', true);

				var tip = $.data(this, 'active.tipsy');
				if (!tip) {
					tip = $('<div class="tipsy"><div class="tipsy-inner"/></div>');
					tip.css({ position: 'absolute', zIndex: 100000 });
					$.data(this, 'active.tipsy', tip);
				}

				if ($(this).attr('title') || typeof ($(this).attr('original-title')) != 'string') {
					$(this).attr('original-title', $(this).attr('title') || '').removeAttr('title');
				}

				var title;
				if (typeof opts.title == 'string') {
					title = $(this).attr(opts.title == 'title' ? 'original-title' : opts.title);
				} else if (typeof opts.title == 'function') {
					title = opts.title.call(this);
				}

				tip.find('.tipsy-inner')[opts.html ? 'html' : 'text'](title || opts.fallback);

				var pos = $.extend({}, $(this).offset(), { width: this.offsetWidth, height: this.offsetHeight });
				tip.get(0).className = 'tipsy'; // reset classname in case of dynamic gravity
				tip.remove().css({ top: 0, left: 0, visibility: 'hidden', display: 'block' }).appendTo(document.body);
				var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
				var gravity = (typeof opts.gravity == 'function') ? opts.gravity.call(this) : opts.gravity;

				switch (gravity.charAt(0)) {
					case 'n':
						tip.css({ top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 }).addClass('tipsy-north');
						break;
					case 's':
						tip.css({ top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 }).addClass('tipsy-south');
						break;
					case 'e':
						tip.css({ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth }).addClass('tipsy-east');
						break;
					case 'w':
						tip.css({ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }).addClass('tipsy-west');
						break;
				}

				if (opts.fade) {
					tip.css({ opacity: 0, display: 'block', visibility: 'visible' }).animate({ opacity: 0.8 });
				} else {
					tip.css({ visibility: 'visible' });
				}

			}, function () {
				$.data(this, 'cancel.tipsy', false);
				var self = this;
				setTimeout(function () {
					if ($.data(this, 'cancel.tipsy')) return;
					var tip = $.data(self, 'active.tipsy');
					if (opts.fade) {
						tip.stop().fadeOut(function () { $(this).remove(); });
					} else {
						tip.remove();
					}
				}, 100);

			});

		});

	};

	// Overwrite this method to provide options on a per-element basis.
	// For example, you could store the gravity in a 'tipsy-gravity' attribute:
	// return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
	// (remember - do not modify 'options' in place!)
	$.fn.tipsy.elementOptions = function (ele, options) {
		return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
	};

	$.fn.tipsy.defaults = {
		fade: false,
		fallback: '',
		gravity: 'n',
		html: false,
		title: 'title'
	};

	$.fn.tipsy.autoNS = function () {
		return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
	};

	$.fn.tipsy.autoWE = function () {
		return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
	};

})(jQuery);

//Tipsy Definitions
$(function () {
	$('.north').tipsy({ gravity: 'n' });
	$('.south').tipsy({ gravity: 's' });
	$('.east').tipsy({ gravity: 'e' });
	$('.west').tipsy({ gravity: 'w' });
});

//Hover Intent Plugin
(function ($) { $.fn.hoverIntent = function (f, g) { var cfg = { sensitivity: 7, interval: 100, timeout: 0 }; cfg = $.extend(cfg, g ? { over: f, out: g} : f); var cX, cY, pX, pY; var track = function (ev) { cX = ev.pageX; cY = ev.pageY; }; var compare = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) { $(ob).unbind("mousemove", track); ob.hoverIntent_s = 1; return cfg.over.apply(ob, [ev]); } else { pX = cX; pY = cY; ob.hoverIntent_t = setTimeout(function () { compare(ev, ob); }, cfg.interval); } }; var delay = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); ob.hoverIntent_s = 0; return cfg.out.apply(ob, [ev]); }; var handleHover = function (e) { var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget; while (p && p != this) { try { p = p.parentNode; } catch (e) { p = this; } } if (p == this) { return false; } var ev = jQuery.extend({}, e); var ob = this; if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); } if (e.type == "mouseover") { pX = ev.pageX; pY = ev.pageY; $(ob).bind("mousemove", track); if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout(function () { compare(ev, ob); }, cfg.interval); } } else { $(ob).unbind("mousemove", track); if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout(function () { delay(ev, ob); }, cfg.timeout); } } }; return this.mouseover(handleHover).mouseout(handleHover); }; })(jQuery);

//Super Sucker Fish Plugin
(function ($) {
	$.fn.superfish = function (op) {

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function () {
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function () {
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer = setTimeout(function () {
					o.retainPath = ($.inArray($$[0], o.$path) > -1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) { over.call(o.$path); }
				}, o.delay);
			},
			getMenu = function ($menu) {
				var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function ($a) { $a.addClass(c.anchorClass).append($arrow.clone()); };

		return this.each(function () {
			var s = this.serial = sf.o.length;
			var o = $.extend({}, sf.defaults, op);
			o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function () {
				$(this).addClass([o.hoverClass, c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;

			$('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function () {
				if (o.autoArrows) addArrow($('>a:first-child', this));
			})
			.not('.' + c.bcClass)
				.hideSuperfishUl();

			var $a = $('a', this);
			$a.each(function (i) {
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function () { over.call($li); }).blur(function () { out.call($li); });
			});
			o.onInit.call(this);

		}).each(function () {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function () {
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined)
			this.toggleClass(sf.c.shadowClass + '-off');
	};
	sf.c = {
		bcClass: 'sf-breadcrumb',
		menuClass: 'sf-js-enabled',
		anchorClass: 'sf-with-ul',
		arrowClass: 'sf-sub-indicator',
		shadowClass: 'sf-shadow'
	};
	sf.defaults = {
		hoverClass: 'sfHover',
		pathClass: 'overideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: { opacity: 'show' },
		speed: 'normal',
		autoArrows: true,
		dropShadows: true,
		disableHI: false, 	// true disables hoverIntent detection
		onInit: function () { }, // callback functions
		onBeforeShow: function () { },
		onShow: function () { },
		onHide: function () { }
	};
	$.fn.extend({
		hideSuperfishUl: function () {
			var o = sf.op,
				not = (o.retainPath === true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility', 'hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl: function () {
			var o = sf.op,
				sh = sf.c.shadowClass + '-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility', 'visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation, o.speed, function () { sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);



/** Following function SORT Options into SelectBox **
/* Usage: $('#mylist').sortOptionsByText(); */ 

jQuery.fn.sort = function () {
    return this.pushStack([].sort.apply(this, arguments), []);
};

jQuery.fn.sortOptions = function (sortCallback) {
    jQuery('option', this)
    .sort(sortCallback)
    .appendTo(this);
    return this;
};

jQuery.fn.sortOptionsByText = function () {
    var byTextSortCallback = function (x, y) {
        var xText = jQuery(x).text().toUpperCase();
        var yText = jQuery(y).text().toUpperCase();
        return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
    };
    return this.sortOptions(byTextSortCallback);
};

jQuery.fn.sortOptionsByValue = function () {
    var byValueSortCallback = function (x, y) {
        var xVal = jQuery(x).val();
        var yVal = jQuery(y).val();
        return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;
    };
    return this.sortOptions(byValueSortCallback);
};

