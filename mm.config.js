/**
 * @see: https://www.hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = util => {
  return  {
    port: 9000,
    testPort: 9005,
    replayPort: 9001,
    // 自己编写的接口
    api: {
      
    },
    
    // 使用 mockjs 生成数据以及 Restful API
    dbCover: true,
    db: util.libObj.mockjs.mock({
      'books|40-60': [
        {
          'id|+1': 1,
          user: /\d\d/,
          view: /\d\d\d\d/,
          'type|1': [`js`, `css`, `html`],
          'discount|1': [`0`, `1`],
          author: {
            'name|1': [`张三`, `李四`],
          },
          title: `@ctitle`,
        },
      ],
    }),
    
    // 实现一个静态文件服务
    static: [
      {
        fileDir: `./public/`,
        path: `/fs/`,
        list: true,
      },
    ],
  }
}