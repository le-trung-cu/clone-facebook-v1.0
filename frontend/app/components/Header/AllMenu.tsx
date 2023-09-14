import SearchIcon from '@/app/icons/Search'
import ActionIcon from './ActionIcon'
import MenuIcon from '@/app/icons/Menu'
import Image from 'next/image'
import clsx from 'clsx'

const society = {
  "name": "Xã hội",
  "items": [
    {
      "title": "Sự kiện",
      "desc": "Tổ chức hoặc tìm sự kiện cùng những hoạt động khác trên mạng và ở quanh đây.",
      "icon": "/event.png",
    },
    {
      "title": "Tìm bạn bè",
      "desc": "Tìm kiếm bạn bè hoặc những người bạn có thể biết.",
      "icon": "/friends.png",
    },
    {
      "title": "Nhóm",
      "desc": "Kết nối với những người cùng chung sở thích.",
      "icon": "/group.png",
    },
    {
      "title": "Bảng tin",
      "desc": "Xem bài viết phù hợp của những người và Trang bạn theo dõi.",
      "icon": "/feed.png",
    },
    {
      "title": "Bảng feed",
      "desc": "Xem bài viết gần đây nhất từ bạn bè, nhóm, Trang và hơn thế nữa.",
      "icon": "/feed.png",
    },
    {
      "title": "Trang",
      "desc": "Khám phá và kết nối với các doanh nghiệp trên Facebook.",
      "icon": "/page.png",
    }
  ]
}

const entertainment = {
  "name": "Giải trí",
  "items": [
    {
      "title": "Video chơi game",
      "desc": "Xem, kết nối với những game và người phát trực tiếp mà bạn yêu thích.",
      "icon": "/video-game.png",
    },
    {
      "title": "Chơi game",
      "desc": "Chơi game bạn yêu thích.",
      "icon": "/game.png",
    },
    {
      "title": "Video",
      "desc": "Đích đến của video phù hợp với sở thích và quan hệ kết nối của bạn.",
      "icon": "/video.png",
    },
    {
      "title": "Video trực tiếp",
      "desc": "Xem video trực tiếp phổ biến từ khắp thế giới",
      "icon": "/live.png",
    }
  ]

}

export default function AllMenu() {
  return (
    <div className="flex flex-col rounded-lg shadow-lg bg-[#f7f8fa] h-full w-[608px] pl-4">
      <h4 className="pb-3 font-bold text-lg">Menu</h4>
      <div className="flex-grow relative">
        <div className="trc-scroll absolute inset-0 overflow-y-auto flex space-x-5 pr-2">
          <div className="h-[1200px] flex-[2] mb-4">
            <div className="rounded-lg bg-white shadow-md p-4">
              <form action="">
                <label className="bg-[#f0f2f5] flex items-center rounded-full pr-4 pl-3 py-2">
                  <SearchIcon />
                  <input className="bg-[#f0f2f5] pl-1 text-base font-light min-w-[220px] focus:outline-none" placeholder="Tìm kiếm trên Facebook" />
                </label>
              </form>
              {[society, entertainment].map(({ name, items }, index) => (
                <div key={name} className="mt-3">
                  <h5 className="font-bold">{name}</h5>
                  <div className="space-y-1.5 mt-3">
                    {items.map(({ icon, title, desc }) => (
                      <div key={title} className="flex hover:bg-[#f2f2f2] p-1.5 rounded-lg cursor-pointer transition-colors">
                        <Image className="w-9 h-9 mr-2" height={36} width={36} alt={title} src={icon} />
                        <div>
                          <div className="text-sm font-bold">{title}</div>
                          <div className="text-xs font-light">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {index < 1 && <hr className="my-5" />}
                </div>
              ))}
            </div>
          </div>
          <div className="sticky top-0 bottom-[200px] h-[500px] flex-1 rounded-lg bg-white px-2 shadow-md mb-4">
            <MenuItemForCreation icon="create-post" title="Đăng"/>
            <MenuItemForCreation icon="feed" title="Tin"/>
            <MenuItemForCreation icon="video" title="Thước phim"/>
            <MenuItemForCreation icon="event" title="Sự kiện trong đời"/>
            <hr className="my-3.5"/>
            <MenuItemForCreation icon="page" title="Trang"/>
            <MenuItemForCreation icon="notify" title="Quảng cáo"/>
            <MenuItemForCreation icon="group" title="Nhóm"/>
            <MenuItemForCreation icon="event-plus" title="Sự kiện"/>
            <MenuItemForCreation icon="marketplace" title="Bài niêm yết trên Marketplace"/>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuItemForCreation({ icon, title }: { icon: string, title: string }) {
  return (
    <div className="flex items-center p-1.5 hover:bg-[#f2f2f2] rounded-lg space-x-2 cursor-pointer">
      <div className="rounded-full h-9 w-9 bg-[#d8dadf] flex justify-center items-center flex-shrink-0">
        <i className={clsx("icon-collection-a", icon)} />
      </div>
      <div className="font-bold text-sm">{title}</div>
    </div>
  )
}
// var span = document.querySelector('#mount_0_0_i3 > div > div:nth-child(1) > div > div:nth-child(3) > div.xds687c.x1pi30zi.x1e558r4.xixxii4.x13vifvy.xzkaem6 > div:nth-child(2) > div > div:nth-child(2) > div.xu96u03.xm80bdy.x10l6tqk.x13vifvy > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x6ikm8r.x1ja2u2z.x1pq812k.x1rohswg.xfk6m8.x1yqm8si.xjx87ck.x1l7klhg.x1iyjqo2.xs83m0k.x2lwn1j.xx8ngbg.xwo3gff.x1oyok0e.x1odjw0f.x1e4zzel.x1n2onr6.xq1qtft.x101xi1x.x1l90r2v.x1swvt13.x1pi30zi > div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6 > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.xjl7jj > div > div > div > div > div > div > div.x1jx94hy.x9f619.x78zum5.xdt5ytf.x1iyjqo2 > div > div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6 > div:nth-child(2) > div > div:nth-child(2)')
// ?.querySelectorAll('span')
// var result = new Map()
// var arr = Array.from(span)
// for (let i = 0; i < 8; i++) {
//   const k = Math.floor(i / 2)
//   console.log(k);

//   if (i % 2 == 0) {
//     result.set(k, { title: arr[i].textContent })
//   } else {
//     const title = result.get(k).title
//     result.set(k, { title, desc: arr[i].textContent })
//   }
// }