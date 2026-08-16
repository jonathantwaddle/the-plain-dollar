import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import CardHub from '@/pages/CardHub';
import BestOfList from '@/pages/BestOfList';
import CardReview from '@/pages/CardReview';
import CardComparison from '@/pages/CardComparison';
import SectionHub from '@/pages/SectionHub';
import CategoryPage from '@/pages/CategoryPage';
import ProductReview from '@/pages/ProductReview';
import GuidesHub from '@/pages/GuidesHub';
import GuideDetail from '@/pages/GuideDetail';
import ToolsHub from '@/pages/ToolsHub';
import AnnualFeeBreakeven from '@/pages/AnnualFeeBreakeven';
import GroceryCardMath from '@/pages/GroceryCardMath';
import LetterArchive from '@/pages/LetterArchive';
import LetterIssue from '@/pages/LetterIssue';
import Glossary from '@/pages/Glossary';
import LearnHub from '@/pages/learn/LearnHub';
import CreditScore from '@/pages/learn/CreditScore';
import Cashback from '@/pages/learn/Cashback';
import BankingBasics from '@/pages/learn/BankingBasics';
import Apply from '@/pages/Apply';
import Search from '@/pages/Search';

import {
  About,
  HowWeMakeMoney,
  Methodology,
  EditorialPolicy,
  AdvertiserDisclosure,
  Contact,
  Privacy,
} from '@/pages/trust';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />

          <Route path="/apply/" component={Apply} />

          <Route path="/cards/" component={CardHub} />
          <Route path="/cards/best/:slug/" component={BestOfList} />
          <Route path="/cards/reviews/:slug/" component={CardReview} />
          <Route path="/cards/compare/:slug/" component={CardComparison} />

          <Route path="/protect/" component={SectionHub} />
          <Route path="/protect/:category/" component={CategoryPage} />
          <Route path="/protect/:category/:slug/" component={ProductReview} />

          <Route path="/plan/" component={SectionHub} />
          <Route path="/plan/:category/" component={CategoryPage} />
          <Route path="/plan/:category/:slug/" component={ProductReview} />

          <Route path="/save/" component={SectionHub} />
          <Route path="/save/:category/" component={CategoryPage} />
          <Route path="/save/:category/:slug/" component={ProductReview} />

          <Route path="/health/" component={SectionHub} />
          <Route path="/health/:category/" component={CategoryPage} />
          <Route path="/health/:category/:slug/" component={ProductReview} />

          <Route path="/learn/" component={LearnHub} />
          <Route path="/learn/credit-score/" component={CreditScore} />
          <Route path="/learn/cashback/" component={Cashback} />
          <Route path="/learn/banking-basics/" component={BankingBasics} />

          <Route path="/guides/" component={GuidesHub} />
          <Route path="/guides/:slug/" component={GuideDetail} />

          <Route path="/tools/" component={ToolsHub} />
          <Route path="/tools/annual-fee-break-even/" component={AnnualFeeBreakeven} />
          <Route path="/tools/grocery-card-math/" component={GroceryCardMath} />

          <Route path="/letter/" component={LetterArchive} />
          <Route path="/letter/:date/" component={LetterIssue} />

          <Route path="/glossary/" component={Glossary} />

          <Route path="/search/" component={Search} />

          <Route path="/about/" component={About} />
          <Route path="/how-we-make-money/" component={HowWeMakeMoney} />
          <Route path="/methodology/" component={Methodology} />
          <Route path="/editorial-policy/" component={EditorialPolicy} />
          <Route path="/advertiser-disclosure/" component={AdvertiserDisclosure} />
          <Route path="/contact/" component={Contact} />
          <Route path="/privacy/" component={Privacy} />

          <Route component={NotFound} />
        </Switch>
      </Layout>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
