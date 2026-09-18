<?php
if (!defined('ABSPATH')) exit;

define('CLS_VERSION','1.1.0');

function cls_setup(){
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('custom-logo');
  add_theme_support('woocommerce');
  add_theme_support('wc-product-gallery-zoom');
  add_theme_support('wc-product-gallery-lightbox');
  add_theme_support('wc-product-gallery-slider');
  register_nav_menus(array('primary'=>'Primary Menu','footer'=>'Footer Menu'));
  load_theme_textdomain('charming-lil-store', get_template_directory() . '/languages');
}
add_action('after_setup_theme','cls_setup');

function cls_assets(){
  wp_enqueue_style('cls-fonts','https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap',array(),null);
  wp_enqueue_style('cls-style',get_stylesheet_uri(),array(),CLS_VERSION);
  wp_enqueue_script('cls-theme',get_template_directory_uri().'/assets/js/theme.js',array(),CLS_VERSION,true);
}
add_action('wp_enqueue_scripts','cls_assets');

require_once get_template_directory() . '/inc/customizer.php';

function cls_wc_wrapper_start(){ echo '<main id="main" class="site-main">'; }
function cls_wc_wrapper_end(){ echo '</main>'; }
remove_action('woocommerce_before_main_content','woocommerce_output_content_wrapper',10);
remove_action('woocommerce_after_main_content','woocommerce_output_content_wrapper_end',10);
add_action('woocommerce_before_main_content','cls_wc_wrapper_start',10);
add_action('woocommerce_after_main_content','cls_wc_wrapper_end',10);

function cls_cart_count(){ return function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0; }

function cls_products($limit=8){
  $q=new WP_Query(array(
    'post_type'=>'product','post_status'=>'publish','posts_per_page'=>$limit,
    'meta_query'=>array(array('key'=>'_stock_status','value'=>'instock'))
  ));
  if($q->have_posts()){
    echo '<div class="product-grid">';
    while($q->have_posts()){ $q->the_post(); global $product;
      if(!$product) continue;
      echo '<article class="product-card"><a href="'.esc_url(get_permalink()).'"><div class="product-image">';
      if($product->is_on_sale()) echo '<span class="onsale">'.esc_html__('Promotion','charming-lil-store').'</span>';
      echo $product->get_image('woocommerce_thumbnail');
      echo '</div><div class="product-info"><div class="product-cat">'.esc_html(wp_strip_all_tags(wc_get_product_category_list($product->get_id()))).'</div>';
      echo '<h3 class="product-title">'.esc_html(get_the_title()).'</h3><div class="price">'.$product->get_price_html().'</div></div></a></article>';
    }
    echo '</div>';
  } else echo '<p>'.esc_html__('Aucun produit disponible pour le moment.','charming-lil-store').'</p>';
  wp_reset_postdata();
}

function cls_woocommerce_notices(){ if(function_exists('wc_print_notices')) wc_print_notices(); }
add_action('woocommerce_before_shop_loop', 'cls_woocommerce_notices', 5);

function cls_body_classes($classes){
  if(class_exists('WooCommerce') && (is_shop() || is_product() || is_cart() || is_checkout() || is_account_page())) $classes[]='cls-commerce-page';
  return $classes;
}
add_filter('body_class','cls_body_classes');

function cls_woocommerce_available(){
  return class_exists('WooCommerce');
}
