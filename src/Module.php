<?php

namespace cms;

use yii\base\BootstrapInterface;
use luya\web\UrlRule;
use luya\web\Application;

/**
 * Cms Module.
 * 
 * @author nadar
 */
class Module extends \luya\base\Module implements BootstrapInterface
{
    /**
     * @var array We have no urlRules in cms Module. the UrlRoute file will only be used when
     *            no module is provided. So the CMS url alias does only apply on default behavior.
     */
    public $urlRules = [
        ['pattern' => 'preview/<itemId:\d+>', 'route' => 'cms/preview/index', 'position' => UrlRule::POSITION_BEFORE_LUYA],
    ];

    /**
     * @var bool If enabled the cms content will be compressed (removing of whitespaces and tabs).
     */
    public $enableCompression = true;

    /**
     * @var bool If enableTagParsing is enabled tags like `link(1)` or `link(1)[Foo Bar]` will be parsed
     *           and transformed into links based on the cms.
     */
    public $enableTagParsing = true;

    /**
     * @var bool CMS is a luya core module.
     */
    public $isCoreModule = true;
    
    /**
     * 
     * {@inheritDoc}
     * @see \luya\base\Module::registerComponents()
     */
    public function registerComponents()
    {
        return [
            'menu' => [
                'class' => 'cms\menu\Container',
            ],
        ];
    }

    public function bootstrap($app)
    {
        $app->on(Application::EVENT_BEFORE_REQUEST, function($event) {
            if (!$event->sender->request->isConsoleRequest && !$event->sender->request->isAdmin()) {
                $event->sender->urlManager->addRules([
                    ['class' => 'cms\components\RouteBehaviorUrlRule'],
                    ['class' => 'cms\components\CatchAllUrlRule'],
                ]);
            }
        });
    }
}
