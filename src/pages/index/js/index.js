import '../less/index.less';
import FastClick  from 'fastclick';

class ReportContent{
    constructor(){
        this.accuseattachment = [];
        this.baseEvents();
        this.businessEvents();
    }
    baseEvents() {
        $('body').on('touchstart', '.tx_active', (event) => {
            this.addClass.call(this, event);
        });
        $('body').on('touchend', '.tx_active', (event) => {
            this.removeClass.call(this, event);
        });

    }

    addClass(event) {
        event.currentTarget.className += ' active';
    }

    removeClass(event) {
        event.currentTarget.className = event.currentTarget.className.replace(' active', '');
    }
    businessEvents(){
        
        var notNeed = FastClick.notNeeded(document.body);
        $.fn.triggerFastClick=function(){
            this.trigger("click");
                if(!notNeed){
                this.trigger("click");
            }
        }
        //添加图片
        $('.add-pic').on('click', e => {
            $("#take-picture").triggerFastClick('click');
        });
        //监听file input
        $("#take-picture").change(e => {
            this.addFile(e);
        });
        
        //保存
        $('body').on('click', '.save', e => {

                alert('保存成功')
                
        })
    }
    addFile(event){
        const _this = this;
        var files = event.target.files;
        if (!files.length || !window.FileReader) {
            alert('此设备不支持上传附件')
            
            return;
        };
        
        // 如果选择的文件是图像，则继续进行
        if (/^image/.test( files[0].type)){
            if(files[0].size > 10485760){
                alert('每个附件不超过 10 M')
                
                return;
            }
            
            // Create a new instance of the FileReader
            var reader = new FileReader();
        
            // 读取本地文件作为dataurl
            reader.readAsDataURL(files[0]);

            reader.onloadend = function(){

                let formData = new FormData();
                formData.append('file', $('#take-picture')[0].files[0]);
                _this.uploadFile(formData, this.result);

            }
        
        }else{
            alert('请上传图片格式附件')
            
        }

    }
    uploadFile(formData, url){
        // $.ajax({
        //     url: '/uploadFile',
        //     type: 'POST',
        //     cache: false,
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: (data) => {
        //         if(data.result == 'success'){
                    
                    
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {

                        // console.log(image.width,image.height);
                        let imgs = $('.pics').find('.img').length;
                        let dataSize = image.width + 'x' + image.height;
                        this.accuseattachment.push({
                            attachmenturl: url,
                            attachmentsize: dataSize
                        });
                      
                        let img = `<figure class="img" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                                        <a href="${url}" itemprop="contentUrl" data-size="${dataSize}">
                                            <img src="${url}" itemprop="thumbnail" alt="Image description" />
                                        </a>
                                        <span class="img-del" data-index="${imgs}"></span>
                                    </figure>`;
                        //添加按钮跟随
                        this.follow(imgs, (imgs + 1) % 5);
                        //添加删除方法
                        $('.pics').append(img);
                        this.delImage();
                        alert('上传图片成功');
                        
                        if(imgs == 9){
                            $('.add-pic').hide();
                        }
                    }
                    
        //         }else{
        //             alert('上传图片失败');
                    
        //         }
                
        //     },
        //     error: () => {
        //         alert('上传图片失败');

        //     }
        // })
    }
    
    delImage(){
        //删除
        $('.img-del').on('click', e => {
            e.stopPropagation();
            e.preventDefault();
            const $this = $(e.currentTarget);
            $this.parent('.img').remove();
            let index = $this.attr('data-index');

            this.accuseattachment.splice(index, 1);
            this.follow($('.img').length - 1, $('.img').length % 5);
            $('.add-pic').show();
        });
    }
    follow(length, diff){
        if(length >= 5) {
            let differ = diff || 1;
            let size = 0.2 + 1.4 * differ + 'rem';
            $('.add-pic').addClass('add-abs').css('left', size);
        }else{
            $('.add-pic').removeClass('add-abs').css('left', 'auto');
        }
    }
}
let reportContent = new ReportContent();