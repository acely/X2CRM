/*****************************************************************************************
 * X2Engine Open Source Edition is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2015 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. or at email address contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 *****************************************************************************************/

$.widget ('x2.x2Dialog', $.ui.dialog, {

    /**
     * Modified to enable button rows. To use button rows add a dummy button with the property
     * lineBreak set to true.
     * This function is a modified version of a base jQuery UI function
     * jQuery UI Sortable @VERSION
     * http://jqueryui.com
     *
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/sortable/
     */
	_createButtons: function( buttons ) {
		var that = this,
			hasButtons = false;

		// if we already have a button pane, remove it
		this.uiDialogButtonPane.remove();
		this.uiButtonSet.empty();

		if ( typeof buttons === "object" && buttons !== null ) {
			$.each( buttons, function() {
				return !(hasButtons = true);
			});
		}
		if ( hasButtons ) {
            /* x2modstart */ 
            row$ = null;
            var startedRow = false;
            /* x2modend */ 
			$.each( buttons, function( name, props ) {
				var button, click;
                /* x2modstart */ 
                if (props.lineBreak) {
                    if (startedRow) {
                        that.uiButtonSet.append ($('<br>'));
                        that.uiButtonSet.append (row$);
                    }
                    row$ = $('<div>', {
                            'class': 'dialog-button-row'
                    });
                    startedRow = true;
                    return;
                }
                /* x2modend */ 

				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				// Default to a non-submitting button
				props = $.extend( { type: "button" }, props );
				// Change the context for the click callback to be the main element
				click = props.click;
				props.click = function() {
					click.apply( that.element[0], arguments );
				};
                /* x2modend */ 
                if (startedRow) {
                    button = $( "<button></button>", props )
                        .appendTo( row$ );
                } else {
                    button = $( "<button></button>", props )
                        .appendTo( that.uiButtonSet );
                }
                /* x2modend */ 
				if ( $.fn.button ) {
					button.button();
				}
			});
            /* x2modstart */ 
            if (row$) {
                that.uiButtonSet.append ($('<br>'));
                that.uiButtonSet.append (row$);
            }
            /* x2modend */ 
			this.uiDialog.addClass( "ui-dialog-buttons" );
			this.uiDialogButtonPane.appendTo( this.uiDialog );
		} else {
			this.uiDialog.removeClass( "ui-dialog-buttons" );
		}
	}
});

