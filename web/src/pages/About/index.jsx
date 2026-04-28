/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Tag, Typography } from '@douyinfe/semi-ui';
import { API, showError } from '../../helpers';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../../context/Status';
import MarkdownRenderer from '../../components/common/markdown/MarkdownRenderer';
import './about.css';

const { Text, Title } = Typography;

const defaultAboutContent = `# 关于 ByteCola

**ByteCola，让 AI 像可乐一样即开即用。**

ByteCola 致力于把 AI 的接入、调用与运营体验做得更直接、更顺手。我们相信，真正好用的 AI 产品不应该让团队把时间浪费在复杂接线、重复配置和碎片化管理上，而应该像打开一瓶可乐一样，开盖就能用、入口统一、体验稳定。

## 我们在做什么

ByteCola 提供统一、轻量、可运营的 AI 接入体验，帮助个人开发者、产品团队和企业组织：

- 用一个入口接入多种 AI 能力
- 更快完成模型接入与业务上线
- 统一管理访问、调用与交付流程
- 在运营、产品与工程之间建立更顺滑的协作方式

## 我们坚持什么

- **即开即用**：减少不必要的配置门槛，让 AI 更快投入实际使用。
- **稳定可靠**：把连续可用、响应稳定和清晰反馈放在第一位。
- **简洁清楚**：界面、文案和交互都应该让用户一眼看懂下一步。
- **持续进化**：随着模型能力和用户场景变化，保持产品可扩展、可运营。

## 联系我们

- 品牌名称：ByteCola
- 联系邮箱：\`comizhang@outlook.com\`
- 商务合作：\`comizhang@outlook.com\`
- 生效页面域名：\`bytecola.cn\``;

const About = () => {
  const { t } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const [about, setAbout] = useState('');
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [isFallbackContent, setIsFallbackContent] = useState(false);

  const systemName = statusState?.status?.system_name || 'ByteCola';
  const serverAddress =
    statusState?.status?.server_address || window.location.origin;
  const docsLink = statusState?.status?.docs_link || 'https://docs.newapi.pro/';
  const normalizedAbout = useMemo(() => about.trim(), [about]);
  const isExternalAbout = normalizedAbout.startsWith('https://');

  const displayAbout = async () => {
    try {
      const res = await API.get('/api/about');
      const { success, message, data } = res.data;
      if (!success) {
        showError(message);
        setAbout(defaultAboutContent);
        setIsFallbackContent(true);
        return;
      }
      const aboutContent =
        typeof data === 'string' ? data.trim() : defaultAboutContent;
      if (aboutContent) {
        setAbout(aboutContent);
        setIsFallbackContent(false);
      } else {
        setAbout(defaultAboutContent);
        setIsFallbackContent(true);
      }
    } catch (error) {
      showError(t('加载关于内容失败...'));
      setAbout(defaultAboutContent);
      setIsFallbackContent(true);
    } finally {
      setAboutLoaded(true);
    }
  };

  useEffect(() => {
    displayAbout().then();
  }, []);

  return (
    <div className='mt-[60px] min-h-[calc(100vh-60px)] bg-[radial-gradient(circle_at_top_left,_rgba(20,148,209,0.10),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(219,13,24,0.08),_transparent_28%),linear-gradient(180deg,_var(--semi-color-bg-0),_var(--semi-color-bg-1))]'>
      <div className='mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10'>
        <section className='relative overflow-hidden rounded-[32px] border border-semi-color-border bg-[linear-gradient(135deg,rgba(20,148,209,0.10),rgba(255,255,255,0.92)_40%,rgba(219,13,24,0.08))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8 lg:p-10'>
          <div className='absolute -left-16 top-10 h-40 w-40 rounded-full bg-[rgba(20,148,209,0.14)] blur-3xl' />
          <div className='absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[rgba(219,13,24,0.10)] blur-3xl' />
          <div className='relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:gap-10'>
            <div>
              <div className='flex flex-wrap items-center gap-3'>
                <Tag color='blue' size='large'>
                  {systemName}
                </Tag>
                <Tag color='red' size='large'>
                  About
                </Tag>
                {isFallbackContent ? (
                  <Tag color='orange' size='large'>
                    默认内容
                  </Tag>
                ) : (
                  <Tag color='green' size='large'>
                    自定义内容
                  </Tag>
                )}
              </div>
              <div className='mt-6'>
                <img
                  src='/bytecola.png'
                  alt='ByteCola'
                  className='w-full max-w-[240px] object-contain md:max-w-[320px]'
                />
              </div>
              <Title
                heading={2}
                className='!mb-3 !mt-6 !text-[2rem] !leading-[1.1] md:!text-[2.6rem]'
              >
                让品牌介绍页更像一个产品页面，而不是一块空白占位。
              </Title>
              <Text className='block max-w-3xl text-base !leading-7 text-semi-color-text-1 md:text-lg'>
                当前 About 页面已经切换为统一的 Markdown 展示层。即使后台暂时没有填写
                About 内容，也会使用内置品牌文案兜底，避免用户看到生硬的“未设置”空状态。
              </Text>
            </div>

            <aside className='rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-6'>
              <Text className='block text-xs font-semibold uppercase tracking-[0.22em] text-semi-color-text-2'>
                Quick Links
              </Text>
              <div className='mt-4 space-y-4'>
                <div className='rounded-2xl border border-semi-color-border bg-[rgba(255,255,255,0.76)] p-4'>
                  <Text className='block text-xs uppercase tracking-[0.18em] text-semi-color-text-2'>
                    当前服务地址
                  </Text>
                  <Text className='mt-2 block break-all text-sm font-semibold text-semi-color-text-0'>
                    {serverAddress}
                  </Text>
                </div>
                <div className='rounded-2xl border border-semi-color-border bg-[rgba(255,255,255,0.76)] p-4'>
                  <Text className='block text-xs uppercase tracking-[0.18em] text-semi-color-text-2'>
                    内容来源
                  </Text>
                  <Text className='mt-2 block text-sm font-semibold text-semi-color-text-0'>
                    {isFallbackContent ? '内置默认品牌文案' : '管理员配置的 About 内容'}
                  </Text>
                </div>
                <div className='grid gap-3'>
                  <Button
                    theme='solid'
                    type='primary'
                    size='large'
                    className='!rounded-full'
                    onClick={() => window.open(docsLink, '_blank')}
                  >
                    打开帮助文档
                  </Button>
                  <Button
                    size='large'
                    className='!rounded-full'
                    onClick={() => window.open('/setup', '_self')}
                  >
                    前往初始化 / 控制台
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className='mt-6 rounded-[32px] border border-semi-color-border bg-[rgba(255,255,255,0.92)] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-6 lg:p-8'>
          {!aboutLoaded ? (
            <div className='space-y-4 px-2 py-6'>
              <div className='h-10 w-2/5 rounded-full bg-[rgba(15,23,42,0.08)]' />
              <div className='h-4 w-full rounded-full bg-[rgba(15,23,42,0.06)]' />
              <div className='h-4 w-11/12 rounded-full bg-[rgba(15,23,42,0.06)]' />
              <div className='h-4 w-4/5 rounded-full bg-[rgba(15,23,42,0.06)]' />
              <div className='h-28 rounded-[24px] bg-[rgba(20,148,209,0.06)]' />
            </div>
          ) : isExternalAbout ? (
            <div className='overflow-hidden rounded-[24px] border border-semi-color-border'>
              <iframe
                src={normalizedAbout}
                title='About'
                className='h-[78vh] w-full border-0 bg-white'
              />
            </div>
          ) : (
            <div className='about-content-shell'>
              <MarkdownRenderer
                content={normalizedAbout || defaultAboutContent}
                className='about-markdown'
                fontSize={16}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
