(this["webpackJsonpreact-app-phonebook"]=this["webpackJsonpreact-app-phonebook"]||[]).push([[0],{26:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},28:function(e,t,a){e.exports=a(59)},33:function(e,t,a){},34:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(25),r=a.n(c),l=(a(33),a(26)),s=a.n(l),i=(a(34),function(){return o.a.createElement("div",{className:"fluid-container"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),o.a.createElement("h1",null,"Phone Book",o.a.createElement("br",null),o.a.createElement("span",null,"React + FireStore")),o.a.createElement("p",{className:"author"},"Ow Yeong")))}),m=a(9),d=a(1),u=a(3),h=a(8),p=a(14);a(35);p.initializeApp({apiKey:"AIzaSyBeP-OKURQn9w09xAwmTO7AWdiH9YCPHso",authDomain:"react-phonebook-c1f3e.firebaseapp.com",databaseURL:"https://react-phonebook-c1f3e.firebaseio.com",projectId:"react-phonebook-c1f3e",storageBucket:"react-phonebook-c1f3e.appspot.com",messagingSenderId:"53683243345",appId:"1:53683243345:web:44248474f13055c1e1eb70"});var b=p.firestore(),f=p.firestore,E=a(12),w=a.n(E),O=function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)({showOrNot:!1}),l=Object(h.a)(r,2),s=l[0],i=l[1],d=Object(n.useState)({showOrNot:!1}),p=Object(h.a)(d,2),f=p[0],E=p[1];Object(n.useEffect)((function(){var e=b.collection("contact").orderBy("lastUpdated","desc").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(u.a)({id:e.id},e.data())}));c(t)}));return function(){e()}}),[]);var O=function(e){i({showOrNot:!0,title:"Confirm Delete Contact?",desc:"Click Yes to permenantly delete the contact. This action is could not be reverse.",targetId:e})};return o.a.createElement("div",null,o.a.createElement("div",{className:"text-center"},o.a.createElement(m.b,{to:"/react-app-phonebook/list/new"},o.a.createElement("button",{type:"button",className:"w-50 m-4 btn btn-success clearfix"},"Create New Contact")),o.a.createElement("br",null),o.a.createElement("table",{className:"table text-left"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{scope:"col"},"ID"),o.a.createElement("th",{scope:"col"},"Name"),o.a.createElement("th",{scope:"col"},"PhoneNumber"),o.a.createElement("th",{scope:"col"},"Action"))),o.a.createElement("tbody",null,a.map((function(e){return o.a.createElement("tr",{key:e.id},o.a.createElement("th",{scope:"row"},e.id),o.a.createElement("td",null,e.name),o.a.createElement("td",null,e.phone),o.a.createElement("td",null,o.a.createElement(m.b,{to:"/react-app-phonebook/list/"+e.id},o.a.createElement("button",{type:"button",className:"btn btn-primary mr-2"},"Edit")),o.a.createElement("button",{type:"button",onClick:O.bind(void 0,e.id),className:"btn btn-danger"},"Delete")))}))))),o.a.createElement(w.a,{show:f.showOrNot,success:!0,title:f.title||"",onConfirm:function(){return E({showOrNot:!1})}},f.desc||""),o.a.createElement(w.a,{show:s.showOrNot,warning:!0,showCancel:!0,confirmBtnText:"Yes, delete it!",confirmBtnBsStyle:"danger",title:s.title||"",onConfirm:function(e){i({showOrNot:!1}),b.collection("contact").doc(e).delete().then((function(){E({showOrNot:!0,title:"Successfully delete the contact",desc:"Successfully delete the contact. You may see the changes instantly."})})).catch((function(e){alert("Some Error Occur when deleting contact. Please Try Again Later!.")}))}.bind(void 0,s.targetId),onCancel:function(){i({showOrNot:!1})}},s.desc||""))},N=function(e){var t=e.match,a=Object(n.useState)({fields:{},errors:{}}),c=Object(h.a)(a,2),r=c[0],l=c[1],s=Object(n.useState)({showOrNot:!1}),i=Object(h.a)(s,2),d=i[0],p=i[1],E=Object(n.useState)({showOrNot:!1}),O=Object(h.a)(E,2),N=O[0],v=O[1],y=t.params.id,g="new"===y,C=function(){var e=r.fields,t={},a=!0;return e.name||(a=!1,t.name="Name Cannot be empty"),e.name&&(e.name.length>50&&(a=!1,t.name="Maximum character allow for name is 50"),e.name.match(/^[a-zA-Z ()]+$/)||(a=!1,t.name="Name can only letters and symbol( -, +, (, ) )")),e.phone||(a=!1,t.phone="Phone Cannot be empty"),e.phone&&(e.phone.length>15&&(a=!1,t.phone="Maximum character allow for phone is 15"),e.phone.match(/^[0-9\-+]+$/)||(a=!1,t.phone="Only number, + or -")),l(Object(u.a)(Object(u.a)({},r),{},{errors:t})),a},x=function(e,t){var a=r.fields;a[e]=t.target.value,l(Object(u.a)(Object(u.a)({},r),{},{fields:a})),C()};return Object(n.useEffect)((function(){!1===g&&b.collection("contact").doc(y).get().then((function(e){if(e.exists){var t=Object(u.a)({id:e.id},e.data());l(Object(u.a)(Object(u.a)({},r),{},{fields:t}))}else g||(window.location.href="/react-app-phonebook/list/new")})).catch((function(){}))}),[]),o.a.createElement("div",null,o.a.createElement("div",{className:"container text-center"},o.a.createElement("h2",{className:"my-3"},g?"New Contact":"Edit Contact"),o.a.createElement("form",null,o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"id"},"Id"),o.a.createElement("input",{disabled:!0,type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"id",value:r.fields.id||""})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"exampleFormControlInput1"},"Contact Name"),o.a.createElement("input",{className:"form-control",placeholder:"Name",type:"text",onChange:x.bind(void 0,"name"),value:r.fields.name||""}),o.a.createElement("div",{className:"invalid-feedback d-block text-left"},r.errors.name||"")),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"exampleFormControlInput1"},"Contact Phone"),o.a.createElement("input",{type:"text",className:"form-control",onChange:x.bind(void 0,"phone"),placeholder:"xxx-xxxxxxx",value:r.fields.phone||""}),o.a.createElement("div",{className:"invalid-feedback d-block text-left"},r.errors.phone||""))),o.a.createElement("button",{onClick:function(){C()?g?b.collection("contact").add(Object(u.a)(Object(u.a)({},r.fields),{},{lastUpdated:f.FieldValue.serverTimestamp()})).then((function(){p({showOrNot:!0,title:"Successfully Created the contact",desc:"Successfully Created the contact into the database. You may see the changes instantly."})})).catch((function(e){v({showOrNot:!0,title:"Error!",desc:"Some error occur please try again later."})})):b.collection("contact").doc(y).set(Object(u.a)(Object(u.a)({},r.fields),{},{lastUpdated:f.FieldValue.serverTimestamp()})).then((function(){p({showOrNot:!0,title:"Successfully Updated the contact",desc:"Successfully Updated the contact into the database. You may see the changes instantly."})})).catch((function(e){v({showOrNot:!0,title:"Error!",desc:"Some error occur please try again later."})})):v({showOrNot:!0,title:"Error!",desc:"Form contains error. Please amend it based on the instruction provided."})},className:"btn btn-success mr-2"},g?"Create New Contact":"Edit Contact"),o.a.createElement(m.b,{to:"/react-app-phonebook/asd"},o.a.createElement("button",{className:"btn btn-secondary"},"Cancel"))),o.a.createElement(w.a,{show:d.showOrNot,success:!0,title:d.title||"",onConfirm:function(){window.location.href="/"}},d.desc||""),o.a.createElement(w.a,{show:N.showOrNot,danger:!0,title:N.title||"",onConfirm:function(){v({showOrNot:!1})}},N.desc||""))};var v=function(){return o.a.createElement(m.a,null,o.a.createElement("div",null,o.a.createElement(i,null),o.a.createElement(d.c,null,o.a.createElement(d.a,{path:"/react-app-phonebook/list/:id",component:N}),o.a.createElement(d.a,{path:"/react-app-phonebook/",component:O}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(58);r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.b2f65cb5.chunk.js.map