<template>
    <header class="home-header">
        <a href="//m.sohu.com">
            <div class="back-home">
                <i class="ico bicon-left-arrow"></i>
                <img class="logo" src="../../../assets/images/t-logo.png" />
            </div>
        </a>
        <div class="label">体育</div>
        <a href="//m.sohu.com/c/3/">
            <div class="old-version">回到旧版</div>
        </a>
    </header>
</template>
<script>
export default {
};
</script>
<style lang="less">
@height: 46px;
.home-header {
    position: relative;
    height: @height;
    box-sizing: border-box;
    background: linear-gradient(80deg,#F9CF35,#FEBE20);
    color: #121212;
    border-bottom: 1px solid #f8b82e;/*no*/
    .back-home {
        position: relative;
        float: left;
        height: @height;
        width: 77px;
        border-right: 1px solid #f5b915; /*no*/
        .ico {
            position: absolute;
            left: 10px;
            top: 50%;
            margin-top: -6px;
            font-size: 12px;
        }
        .logo {
            position: absolute;
            left: 28px;
            top: 50%;
            margin-top: -9px;
            height: 18px;
        }
    }
    .label {
        display: flex;
        float: left;
        line-height: @height;
        font-size: 17px;
        padding-left: 10px;
        font-weight: bold;
        border-left: 1px solid #fdd037; /*no*/
    }
    .old-version {
        float: right;
        line-height: @height;
        padding: 0 10px;
        font-size: 13px;
    }
}
</style>

