<?php

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

$pieces = explode(", ",$model->editPermissions);
$user = Yii::app()->user->getName();

$authParams = array('X2Model' => $model);
$menuOptions = array(
    'index', 'create', 'createEmail', 'createQuote',
);
$action = $this->action->id;
if (!$model->isNewRecord) {
    $existingRecordMenuOptions = array(
        'view', 'permissions', 'exportToHtml',
    );
    if ($action !== 'update' && $model->checkEditPermissions ()) {
        $existingRecordMenuOptions[] = 'edit';
    }
    if ($this->checkPermissions ($model, 'delete'))
        $existingRecordMenuOptions[] = 'delete';
    $menuOptions = array_merge($menuOptions, $existingRecordMenuOptions);;
}
$this->insertMenu($menuOptions, $model, $authParams);

?>
<div class="page-title icon docs"><h2><span class="no-bold"><?php echo CHtml::encode($title); ?></span> <?php echo CHtml::encode($model->name); ?></h2>
<?php
if(!$model->isNewRecord){
    if($model->checkEditPermissions () && $action != 'update'){
        echo X2Html::editRecordButton($model);
        // echo CHtml::link('<span></span>', array('/docs/docs/update', 'id' => $model->id), array('class' => 'x2-button x2-hint icon edit right', 'title' => Yii::t('docs', 'Edit')));
    }
    echo CHtml::link('<span></span>', array('/docs/docs/create', 'duplicate' => $model->id), array('class' => 'x2-button icon copy right', 'title' => Yii::t('docs', 'Make a copy')));
    echo "<br>\n";
}
?>
</div>
