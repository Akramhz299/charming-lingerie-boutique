<?php
if(!defined('ABSPATH'))exit;
function cls_customize($wp_customize){
 $wp_customize->add_section('cls_home',array('title'=>'Charming Lil Store — Accueil','priority'=>30));
 $fields=array(
  'cls_hero_eyebrow'=>array('Nouvelle collection','eyebrow'),
  'cls_hero_title'=>array('La lingerie qui vous fait sentir charming.','title'),
  'cls_hero_text'=>array('Découvrez nos lingeries, ensembles et pyjamas élégants. Une sélection féminine pensée pour le confort et le style.','text'),
  'cls_topbar'=>array('Paiement à la livraison · Livraison offerte dès 600 MAD · Échange sous 14 jours','text')
 );
 foreach($fields as $id=>$v){
  $wp_customize->add_setting($id,array('default'=>$v[0],'sanitize_callback'=>'wp_kses_post'));
  $wp_customize->add_control($id,array('label'=>$v[0],'section'=>'cls_home','type'=>$v[1]==='title'?'textarea':'text'));
 }
}
add_action('customize_register','cls_customize');
