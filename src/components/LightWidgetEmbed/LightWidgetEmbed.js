import React from 'react';

function LightWidgetComponent() {
  const widgetCode = `<iframe src="//lightwidget.com/widgets/bd562e7babd7534b9b1e67b55ecfafe5.html" scrolling="no" allowtransparency="true" 
class="lightwidget-widget" style="width:100%; border:0; overflow:auto;"></iframe>
  `;

  return (
      <div dangerouslySetInnerHTML={{ __html: widgetCode }}></div>
  );
}

export default LightWidgetComponent;




