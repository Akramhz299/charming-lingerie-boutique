<?php
/**
 * Plugin Name: Charming Lil Store Companion
 * Description: Small WooCommerce enhancements for Charming Lil Store.
 * Version: 1.0.0
 */
if(!defined('ABSPATH'))exit;
add_action('woocommerce_before_add_to_cart_button',function(){echo '<div class="cls-size-note" style="margin:14px 0;font-size:12px;color:#5c5350">Choisissez votre taille et votre couleur avant d’ajouter au panier. <a href="'.esc_url(wc_get_page_permalink('shop')).'" style="text-decoration:underline">Voir la boutique</a></div>';});
add_filter('woocommerce_product_add_to_cart_text',function($text,$product){return $product->is_type('variable')?'Choisir les options':'Ajouter au panier';},10,2);
