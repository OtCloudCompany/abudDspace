import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
import {APP_CONFIG, AppConfig} from '../../../../../config/app-config.interface';
import {CommunityDataService} from '../../../../../app/core/data/community-data.service';
import {PaginationService} from '../../../../../app/core/pagination/pagination.service';

interface FetchedCommunity {
  name: string;
  uuid: string;
  itemsCount: number;
  logo: string;
}

@Component({
  selector: 'ds-top-level-community-list',
  styleUrls: ['../../../../../app/home-page/top-level-community-list/top-level-community-list.component.scss'],
  templateUrl: './top-level-community-list.component.html'
})

export class TopLevelCommunityListComponent extends BaseComponent implements OnInit{
  communitiesFetched:  FetchedCommunity[] = [];

  constructor(@Inject(APP_CONFIG) protected appConfig: AppConfig,
              cds: CommunityDataService,
              paginationService: PaginationService,
              private cd: ChangeDetectorRef) {
    super(appConfig, cds, paginationService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.communitiesRD$.subscribe( (rsp) => {
      if (rsp.hasCompleted && rsp.payload){
        let counter = 1;
        rsp.payload.page.forEach(community=>{
          this.communitiesFetched.push({
            name: community.name,
            uuid: community.uuid,
            logo: `${counter}`,
            itemsCount: community.archivedItemsCount,
          });
          counter++;
        });
        this.cd.detectChanges();
      }
    });

  }
}


