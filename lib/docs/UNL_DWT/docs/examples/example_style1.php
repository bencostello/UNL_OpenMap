<?php
/**
 * This example uses the DWT object generated by: '/usr/local/bin/php /Users/bbieber/Sites/UNL_TourMap/lib/php/UNL/DWT/createTemplates.php /Users/bbieber/Sites/UNL_TourMap/lib/docs/UNL_DWT/docs/examples/example.ini'
 * 
 */
ini_set('display_errors',true);
error_reporting(E_ALL|E_STRICT);

require_once 'UNL/DWT.php';
if ('/Users/bbieber/Sites/UNL_TourMap/lib/data' == '@'.'DATA_DIR@') {
    $configfile = 'example.test.ini';
} else {
    $configfile = '/Users/bbieber/Sites/UNL_TourMap/lib/docs/UNL_DWT/docs/examples/example.ini';
}
$config = parse_ini_file($configfile, true);
foreach($config as $class=>$values) {
   UNL_DWT::$options = $values;
}
$page = UNL_DWT::factory('Template_style1');
$page->header  = "Example Using Template Style 1";
$page->leftnav = "<ul><li><a href='http://pear.unl.edu/'>UNL PEAR Channel</a></li></ul>";
$page->content = "<p>This example demonstrates the usefulness of the DWT object generator for Dreamweaver Templates.</p>";
$page->content .= "<p>Included with the DWT package is a Dreamweaver template with 4 editable regions [template_style1.dwt]. This page is rendered using the DWT class created from that template.</p>";
$page->content .= "<p>To create classes for your Templates, create a .ini file with the location of your Dreamweaver templates (dwt's) and then run the createTemplates.php script to generate objects for each of your template files.</p>";
$page->content .= "<p>Here is the ini file used to create the Template_style1:<pre><code>".file_get_contents($configfile)."</code></pre></p>";
$page->content .= "<p>And the command used to create the template classes:<pre><code>/usr/local/bin/php /Users/bbieber/Sites/UNL_TourMap/lib/php/UNL/DWT/createTemplates.php /Users/bbieber/Sites/UNL_TourMap/lib/docs/UNL_DWT/docs/examples/example.ini</code></pre></p>";
$page->footer  = "<a href='mailto:brett.bieber@gmail.com'>Brett Bieber</a>";
echo $page->toHtml();