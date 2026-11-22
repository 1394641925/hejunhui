/* 和君汇 —— 商品数据、购物车/订单存储 */
window.HJ = (function(){
  var PKEY='hj_products_cart', OKEY='hj_orders';

  // 商品数据（图片为本地免费图库图）
  var PRODUCTS=[
    {id:'p01',name:'锦绣唐装·男款寿衣套装',cat:'男款',price:3680,old:4680,img:'assets/images/product-tang-black.jpg',
     desc:'经典唐装立领设计，藏青配金线刺绣，庄重得体，含上衣、裤子、马褂、内衬。',
     detail:'精选仿真丝缎面，手工盘扣，梅花暗纹刺绣。适合追求传统庄重的长者。',
     sizes:['S','M','L','XL'],material:'仿真丝缎面',include:'上衣·裤子·马褂·内衬·寿鞋',tags:['热销','传统']},
    {id:'p02',name:'福寿绒面·女款唐装套装',cat:'女款',price:3980,old:4980,img:'assets/images/product-tang-red.jpg',
     desc:'正红绒面配牡丹刺绣，寓意福寿绵长，含上衣、长裤、披肩、内衬。',
     detail:'高密度绒面，立体牡丹金线绣花，圆领设计温和端庄。适合女性长者。',
     sizes:['S','M','L','XL'],material:'绒面缎',include:'上衣·长裤·披肩·内衬·寿鞋',tags:['热销','喜庆']},
    {id:'p03',name:'素雅旗袍·女士寿衣',cat:'女款',price:4280,old:5280,img:'assets/images/product-qipao.jpg',
     desc:'改良旗袍剪裁，素雅印花，体现东方女性的端庄与体面。',
     detail:'真丝质感面料，手工滚边，修身版型。含旗袍、内衬、披肩、寿鞋。',
     sizes:['S','M','L'],material:'真丝质感',include:'旗袍·内衬·披肩·寿鞋',tags:['新品','典雅']},
    {id:'p04',name:'中山装·男士正装寿衣',cat:'男款',price:3280,old:3980,img:'assets/images/product-formal.jpg',
     desc:'经典中山装款式，深灰挺括面料，庄重肃穆，适合党员、干部及长辈。',
     detail:'精纺混纺面料，版型挺括，四袋五扣经典工艺。含上衣、裤子、衬衣、寿鞋。',
     sizes:['M','L','XL','XXL'],material:'精纺混纺',include:'上衣·裤子·衬衣·寿鞋',tags:['经典','正装']},
    {id:'p05',name:'丝绸华服·男女同款',cat:'男款',price:5680,old:6880,img:'assets/images/product-silk.jpg',
     desc:'高端真丝面料，光泽柔和，刺绣精致，适合追求品质的家庭。',
     detail:'100%桑蚕丝混纺，手工盘扣与云纹刺绣，附赠精美收纳盒。',
     sizes:['S','M','L','XL'],material:'桑蚕丝混纺',include:'上衣·裤子·内衬·披肩·寿鞋·收纳盒',tags:['高端','礼盒']},
    {id:'p06',name:'传统对襟·中式寿衣',cat:'男款',price:2680,old:3280,img:'assets/images/product-traditional.jpg',
     desc:'传统对襟设计，团花织锦面料，古朴庄重，价格亲民。',
     detail:'织锦提花面料，传统工艺制作，含上衣、裤子、内衬、寿鞋。',
     sizes:['M','L','XL'],material:'织锦提花',include:'上衣·裤子·内衬·寿鞋',tags:['实惠','传统']},
    {id:'p07',name:'雅致绣花·女士礼服套装',cat:'女款',price:4680,old:5680,img:'assets/images/product-dress.jpg',
     desc:'淡雅色系，精致刺绣，温婉大方，适合注重仪容体面的家庭。',
     detail:'轻柔纱缎结合，手工立体绣花，含礼服、内衬、披肩、寿鞋。',
     sizes:['S','M','L'],material:'纱缎',include:'礼服·内衬·披肩·寿鞋',tags:['新品','雅致']},
    {id:'p08',name:'商务西装·男士寿衣套装',cat:'男款',price:3880,old:4580,img:'assets/images/product-suit.jpg',
     desc:'现代西装款式，深色正装，适合生前喜爱西式正装的长辈。',
     detail:'精纺羊毛混纺，修身版型，含西装上衣、西裤、衬衫、领带、寿鞋。',
     sizes:['M','L','XL','XXL'],material:'羊毛混纺',include:'西装上衣·西裤·衬衫·领带·寿鞋',tags:['现代','正装']}
  ];

  function readCart(){try{return JSON.parse(localStorage.getItem(PKEY)||'[]')}catch(e){return []}}
  function saveCart(c){try{localStorage.setItem(PKEY,JSON.stringify(c))}catch(e){}}
  function addCart(id,size,qty){
    qty=qty||1;var c=readCart();var found=c.find(function(x){return x.id===id&&x.size===size});
    if(found){found.qty+=qty}else{c.push({id:id,size:size||'M',qty:qty})}
    saveCart(c);return c.length;
  }
  function updateQty(id,size,qty){
    var c=readCart();c=c.map(function(x){if(x.id===id&&x.size===size)x.qty=qty;return x}).filter(function(x){return x.qty>0});
    saveCart(c);return c;
  }
  function removeCart(id,size){saveCart(readCart().filter(function(x){return !(x.id===id&&x.size===size)}))}
  function cartDetail(){
    return readCart().map(function(x){
      var p=PRODUCTS.find(function(y){return y.id===x.id});
      return p?{id:x.id,size:x.size,qty:x.qty,name:p.name,img:p.img,price:p.price}:null;
    }).filter(Boolean);
  }
  function cartCount(){return readCart().reduce(function(s,x){return s+x.qty},0)}
  function cartTotal(){return cartDetail().reduce(function(s,x){return s+x.price*x.qty},0)}

  function readOrders(){try{return JSON.parse(localStorage.getItem(OKEY)||'[]')}catch(e){return []}}
  function saveOrders(o){try{localStorage.setItem(OKEY,JSON.stringify(o))}catch(e){}}
  function orderNo(){
    var d=new Date(),p=function(n){return ('0'+n).slice(-2)};
    var stamp=''+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate());
    return 'HJ-'+stamp+'-'+('0000'+Math.floor(Math.random()*10000)).slice(-4);
  }
  function placeOrder(info){
    var o=readOrders();var order={
      no:orderNo(),time:new Date().toLocaleString('zh-CN',{hour12:false}),
      items:cartDetail(),total:cartTotal(),info:info,status:'待配送'
    };
    o.unshift(order);saveOrders(o);saveCart([]);return order;
  }

  function money(n){return '¥'+Number(n).toLocaleString('zh-CN')}
  function fmtDate(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}

  return {PRODUCTS:PRODUCTS,getProduct:function(id){return PRODUCTS.find(function(p){return p.id===id})},
    readCart:readCart,addCart:addCart,updateQty:updateQty,removeCart:removeCart,cartDetail:cartDetail,
    cartCount:cartCount,cartTotal:cartTotal,readOrders:readOrders,placeOrder:placeOrder,
    orderNo:orderNo,money:money,fmtDate:fmtDate,clearCart:function(){saveCart([])}};
})();
