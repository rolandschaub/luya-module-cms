<?php

namespace cmstests\src\admin\importers;

use cmstests\CmsConsoleTestCase;
use luya\console\commands\ImportController;
use luya\testsuite\fixtures\ActiveRecordFixture;
use luya\cms\admin\importers\CmslayoutImporter;
use luya\cms\models\Layout;
use luya\helpers\Json;

class CmslayoutImporterTest extends CmsConsoleTestCase
{
    public function testBasicLayoutImporter()
    {
        // config fixture
        $layout = new ActiveRecordFixture([
            'modelClass' => Layout::class
        ]);
        
        $controller = new ImportController('import-controller', $this->app);
        $importer = new CmslayoutImporter($controller, $this->app->getModule('cmsadmin'));

        $this->assertNull($importer->run());
        
        $log = $importer->importer->getLog();
        
        $this->assertSame([
            'luya\cms\admin\importers\CmslayoutImporter' => [
                0 => 'New file Phplayout found and registered.',
                1 => 'New file Layoutwithjson found and registered.',
                2 => 'cms layout importer finished with 2 layout files.',
            ]
        ], $log);
    }

    public function testLayoutCompare()
    {
        $controller = new ImportController('import-controller', $this->app);
        $importer = new CmslayoutImporter($controller, $this->app->getModule('cmsadmin'));

        $j1 = Json::decode('{"cols": 12, "var": "content", "label": "Conent"}');
        $j2 = Json::decode('{"cols": 5, "var": "content", "label": "Conent"}');

        $this->assertFalse($importer->comparePlaceholders($j1, $j2));
        $this->assertFalse($importer->comparePlaceholders($j2, $j1));
    }
}
